import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { InputCreateProcedureDto } from './dtos/create.dto';
import { Procedure } from './entities/procedure.entity';
import { ProcedureService } from './procedure.service';

@Controller('procedures')
export class ProcedureController {
  constructor(private readonly procedureService: ProcedureService) {}

  @Post()
  async create(@Body() input: InputCreateProcedureDto) {
    const procedureExists = await this.procedureService.findBy({
      column: 'name',
      value: input.name,
    });

    if (procedureExists) {
      throw new ConflictException({
        Error: 'A procedure with this name already exists!',
      });
    }

    const procedure = await this.procedureService.create({
      ...input,
      uuid: uuidV4(),
    });

    return procedure;
  }

  @Get()
  async findAll() {
    const procedures = await this.procedureService.findAll();

    return procedures;
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    const procedure = await this.procedureService.findBy({
      column: 'uuid',
      value: uuid,
    });

    if (!procedure)
      throw new NotFoundException({
        Error: 'There is no procedure with this uuid!',
      });

    return procedure;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    const procedure = await this.procedureService.findBy({
      column: 'uuid',
      value: uuid,
    });

    if (!procedure)
      throw new NotFoundException({
        Error: 'There is no procedure with this uuid!',
      });

    await this.procedureService.remove(procedure.id);
  }

  @Put(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('uuid') uuid: string,
    @Body()
    props: Partial<
      Pick<Procedure, 'name' | 'comission' | 'value' | 'duration'>
    >,
  ) {
    const procedure = await this.procedureService.findBy({
      column: 'uuid',
      value: uuid,
    });

    if (!procedure)
      throw new NotFoundException({
        Error: 'There is no procedure with this uuid!',
      });

    if (props.name && props.name !== procedure.name) {
      const procedureNameAlreadyExists = await this.procedureService.findBy({
        column: 'name',
        value: props.name,
      });

      if (procedureNameAlreadyExists)
        throw new ConflictException({
          Error: 'A procedure with this name already exists!',
        });
    }

    await this.procedureService.update({
      id: procedure.id,
      updateFields: props,
    });
  }
}
