import type { CorsConfig } from '@ioc:Adonis/Core/Cors'

const corsConfig: CorsConfig = {
  enabled: true,

  // Allow requests from your frontend origin
  origin: 'http://localhost:4200', // Replace with your actual frontend origin if different

  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],

  headers: true,

  exposeHeaders: [
    'cache-control',
    'content-language',
    'content-type',
    'expires',
    'last-modified',
    'pragma',
  ],

  credentials: true, // Allow cookies if needed

  maxAge: 90, // How long the browser should cache CORS preflight requests (seconds)
}

export default corsConfig
