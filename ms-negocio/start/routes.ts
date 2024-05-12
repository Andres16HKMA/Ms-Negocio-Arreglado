/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.post("/departaments","DepartmentsController.store");
Route.get("/departaments","DepartmentsController.index");
Route.get("/departaments/:id","DepartmentsController.show");
Route.put("/departaments/:id","DepartmentsController.update");
Route.delete("/departaments/:id","DepartmentsController.delete");

Route.post("/cities","CitiesController.store");
Route.get("/cities","CitiesController.index");
Route.get("/cities/:id","CitiesController.show");
Route.put("/cities/:id","CitiesController.update");
Route.delete("/cities/:id","CitiesController.delete");

Route.post("/sites","SitesController.store");
Route.get("/sites","DepartmentsController.index");
Route.get("/sites/:id","DepartmentsController.show");
Route.put("/sites/:id","DepartmentsController.update");
Route.delete("/sites/:id","DepartmentsController.delete");

Route.post("/halls","HallsController.store");
Route.get("/halls","HallsController.index");
Route.get("/halls/:id","HallsController.show");
Route.put("/halls/:id","HallsController.update");
Route.delete("/halls/:id","HallsController.delete");

Route.post("/plans","PlansController.store");
Route.get("/plans","PlansController.index");
Route.get("/plans/:id","PlansController.show");
Route.put("/plans/:id","PlansController.update");
Route.delete("/plans/:id","PlansController.delete");

Route.post("/services","ServicesController.store");
Route.get("/services","ServicesController.index");
Route.get("/services/:id","ServicesController.show");
Route.put("/services/:id","ServicesController.update");
Route.delete("/services/:id","ServicesController.delete");

Route.post("/payments","PaymentsController.store");
Route.get("/payments","PaymentsController.index");
Route.get("/payments/:id","PaymentsController.show");
Route.put("/payments/:id","PaymentsController.update");
Route.delete("/payments/:id","PaymentsController.delete");

Route.post("/chats","ChatsController.store");
Route.get("/chats","ChatsController.index");
Route.get("/chats/:id","ChatsController.show");
Route.put("/chats/:id","ChatsController.update");
Route.delete("/chats/:id","ChatsController.delete");    

Route.post('/traslados', 'TrasladosController.store');
Route.get('/traslados', 'TrasladosController.index');
Route.get('/traslados/:id', 'TrasladosController.show');
Route.put('/traslados/:id', 'TrasladosController.update');
Route.delete('/traslados/:id', 'TrasladosController.destroy');

Route.post('/sepulturas', 'SepulturasController.store');
Route.get('/sepulturas', 'SepulturasController.index');
Route.get('/sepulturas/:id', 'SepulturasController.show');
Route.put('/sepulturas/:id', 'SepulturasController.update');
Route.delete('/sepulturas/:id', 'SepulturasController.destroy');

Route.post('/mensajes', 'MensajesController.store');
Route.get('/mensajes', 'MensajeController.index');
Route.get('/mensajes/:id', 'MensajesController.show');
Route.put('/mensjaes/:id', 'MensajesController.update');
Route.delete('/mensjaes/:id', 'MensajesController.destroy');

Route.post('/cremacion', 'CremacionsController.store');
Route.get('/cremacion', 'CremacionsController.index');
Route.get('/cremacion/:id', 'CremacionsController.show');
Route.put('/cremacion/:id', 'CremacionsController.update');
Route.delete('/cremacion/:id', 'CremacionsController.destroy');

Route.post('/login', 'AuthController.login');
Route.put('/second-factor', 'AuthController.secondFactor');