import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
  const response = await axios.get(`http://localhost:3000/countries`);
  return response.data;
});

export const fetchCountryById = createAsyncThunk('countries/fetchCountryById', async (id) => {
  const response = await axios.get(`http://localhost:3000/countries/${id}`);
  return response.data.country;
});
export const fetchCountryByName = createAsyncThunk('countries/fetchCountryByName', async (name) => {
  const response = await axios.get(`http://localhost:3000/countries/busqueda/name?name=${name}`);
  return response.data;
});
const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    countriesPerPage: 10,
    currentPage: 1,
    filteredCountries: [],
    activities: [],
    status: 'idle',
    error: null,
    selectedCountry: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    filterByContinent: (state, action) => {
      if (action.payload) {
        state.filteredCountries = state.countries.filter(country => country.continent === action.payload);
      } else {
        state.filteredCountries = state.countries;
      }
    },
    filterByActivity: (state, action) => {
      if (action.payload) {
        state.filteredCountries = state.countries.filter(country =>
          country.activities.some(activity => activity.name === action.payload));
      } else {
        state.filteredCountries = state.countries;
      }
    },
    sortByName: (state, action) => {
      state.filteredCountries.sort((a, b) => {
        if (action.payload === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    },
    sortByPopulation: (state, action) => {
      state.filteredCountries.sort((a, b) => {
        if (action.payload === 'asc') {
          return a.population - b.population;
        } else {
          return b.population - a.population;
        }
      });
    },
    setCountryDetails: (state, action) => {
      state.selectedCountry = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = action.payload;
        state.filteredCountries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCountryById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountryById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedCountry = action.payload;
      })
      .addCase(fetchCountryById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  setCurrentPage,
  filterByContinent,
  filterByActivity,
  sortByName,
  sortByPopulation,
  setCountryDetails
} = countriesSlice.actions;

export default countriesSlice.reducer;
