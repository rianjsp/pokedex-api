import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "https://pokeapi.co/api/v2/pokemon";
