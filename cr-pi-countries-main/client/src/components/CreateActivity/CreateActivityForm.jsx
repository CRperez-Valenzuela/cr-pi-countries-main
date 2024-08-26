import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import {
  BackgroundContainer,
  FormContainer,
  Form,
  Label,
  Input,
  Button,
  Error,
  SuccessMessage,
  HomeButton,
  HomeButtonContainer,
  StyledSelect,
} from './createactivity-style';
import { createActivity } from '../../redux/activitiesSlice';
import { fetchCountries } from '../../redux/countriesSlice';

const CreateActivityForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state) => state.countries.countries);
  const [formData, setFormData] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    countryNames: [],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateForm();
  };

  const handleCountryChange = (selectedOptions) => {
    const selectedCountries = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    setFormData({
      ...formData,
      countryNames: selectedCountries,
    });
    validateForm();
  };

  const validateForm = () => {
    const { name, difficulty, duration, season, countryNames } = formData;
    if (name && !/\d/.test(name) && difficulty && duration && season && countryNames.length > 0) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formValid) {
      try {
        const response = await dispatch(createActivity(formData));
        const { payload } = response;

        if (payload.error) {
          if (payload.type === 'duplicate_country') {
            setError(payload.error);
          } else if (payload.type === 'different_details') {
            setError(payload.error);
          } else if (payload.type === 'add_country') {
            if (window.confirm(payload.error)) {
              await dispatch(createActivity({ ...formData, addCountry: true }));
              setSuccess('País agregado a la actividad existente con éxito.');
              setFormData({
                name: '',
                difficulty: '',
                duration: '',
                season: '',
                countryNames: [],
              });
            }
          } else if (payload.error.includes('no existen')) {
            setError('El nombre del país es incorrecto o no existe.');
          }
        } else {
          setSuccess('Actividad creada con éxito.');
          setFormData({
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            countryNames: [],
          });
        }
      } catch (error) {
        setError('Hubo un error al crear la actividad.');
      }
    } else {
      alert('Debe completar todos los campos obligatorios para crear la actividad.');
      highlightRequiredFields();
    }
  };

  const highlightRequiredFields = () => {
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    requiredFields.forEach((field) => {
      field.classList.add('highlight');
    });
  };

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <BackgroundContainer>
      <HomeButtonContainer>
        <HomeButton onClick={handleGoHome} />
      </HomeButtonContainer>
      <FormContainer>
        <h2>Crear Actividad Turística</h2>
        <Form onSubmit={handleSubmit}>
          
          <Label>Dificultad:</Label>
          <div>
            {[1, 2, 3, 4, 5].map((level) => (
              <label key={level}>
                <input
                  type="radio"
                  name="difficulty"
                  value={level}
                  checked={formData.difficulty === String(level)}
                  onChange={handleChange}
                  required
                />
                {level}
              </label>
            ))}
          </div>
          <Label htmlFor="duration">Duración (en horas)</Label>
          <Input
            type="text"
            name="duration"
            placeholder="Duración (en horas)"
            value={formData.duration}
            onChange={handleChange}
            required
          />
          <Label htmlFor="season">Temporada</Label>
          <select
            name="season"
            value={formData.season}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una temporada</option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>
          <Label htmlFor="countryNames">País(es)</Label>
          <StyledSelect
            classNamePrefix="Select"
            isMulti
            name="countryNames"
            options={countries.map((country) => ({ value: country.name, label: country.name }))}
            onChange={handleCountryChange}
            value={formData.countryNames.map((name) => ({ value: name, label: name }))}
          />

          <Label htmlFor="name">Nombre de la actividad</Label>
          <Input
            type="text"
            name="name"
            placeholder="Nombre de la actividad"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Button type="submit" disabled={!formValid}>
            Crear Actividad
          </Button>
        </Form>
        {error && <Error>{error}</Error>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </FormContainer>
    </BackgroundContainer>
  );
};

export default CreateActivityForm;
