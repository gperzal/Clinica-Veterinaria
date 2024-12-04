import PropTypes from 'prop-types';

export const PetInfoProps = {
  petData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    breed: PropTypes.string,
    color: PropTypes.string,
    sex: PropTypes.string,
    chipNumber: PropTypes.string,
    healthStatus: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  onPetDataChange: PropTypes.func.isRequired,
};

export const OwnerInfoProps = {
  ownerData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export const ExamsProps = {
  examsData: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      result: PropTypes.string,
      date: PropTypes.string,
    })
  ).isRequired,
};

export const AllergiesProps = {
  allergies: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAllergyChange: PropTypes.func.isRequired,
};

export const MedicalInfoProps = {
  medicalInfo: PropTypes.shape({
    weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    temperature: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    heartRate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    respiratoryRate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    bodyCondition: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    hydrationLevel: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    systolicPressure: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    diastolicPressure: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    mucosaColor: PropTypes.string,
    mucosaObservations: PropTypes.string,
    activityLevel: PropTypes.string,
    temperament: PropTypes.string,
    diet: PropTypes.string,
    digestion: PropTypes.string,
  }).isRequired,
  setMedicalInfo: PropTypes.func.isRequired,
};

export const SelectedAppointmentProps = {
  selectedAppointment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    pet: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      age: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      breed: PropTypes.string,
      color: PropTypes.string,
      sex: PropTypes.string,
      chipNumber: PropTypes.string,
      owner: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string,
        phone: PropTypes.string,
        address: PropTypes.string,
      }).isRequired,
    }).isRequired,
    specialist: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export const NotesProps = {
  isClinicalRest: PropTypes.bool.isRequired,
  onToggleClinicalRest: PropTypes.func.isRequired,
  notes: PropTypes.string.isRequired,
  setNotes: PropTypes.func.isRequired,
};