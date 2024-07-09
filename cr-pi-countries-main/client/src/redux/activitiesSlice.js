import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks para manejar las peticiones asíncronas
export const createActivity = createAsyncThunk('activities/createActivity', async (activityData, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:3000/activity/create', activityData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchAllActivities = createAsyncThunk('activities/fetchAllActivities', async (_, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:3000/activity/activities');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: {
    activities: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createActivity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Agregar o actualizar la actividad en el estado
        const existingActivity = state.activities.find(activity => activity.id === action.payload.id);
        if (existingActivity) {
          existingActivity.countries = action.payload.countries;
        } else {
          state.activities.push(action.payload);
        }
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchAllActivities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllActivities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Reemplazar el estado de actividades con los datos recibidos
        state.activities = action.payload;
      })
      .addCase(fetchAllActivities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default activitiesSlice.reducer;
