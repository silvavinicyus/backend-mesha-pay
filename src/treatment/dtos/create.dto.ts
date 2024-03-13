export type InputCreateTreatmentDto = {
  procedures: number[];
  client_id: number;
  doctor_id: number;
};

export type InputCreateTreatmentRepository = {
  uuid: string;
  client_id: number;
  doctor_id: number;
  treatment_procedures: {
    procedure_id: number;
    comission_value: number;
  }[];
  value: number;
  comission: number;
};
