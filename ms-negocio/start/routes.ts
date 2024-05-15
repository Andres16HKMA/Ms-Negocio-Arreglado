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

Route.post("/sites","SitesController.store");
Route.get("/sites","SitesController.index");
Route.get("/sites/:id","SitesController.show");
Route.put("/sites/:id","SitesController.update");
Route.delete("/sites/:id","SitesController.delete");

Route.post("/halls","HallsController.store");
Route.get("/halls","HallsController.index");
Route.get("/halls/:id","HallsController.find");
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

Route.post('/message', 'MessagesController.store');
Route.get('/message', 'MessagesController.index');
Route.get('/message/:id', 'MessagesController.show');
Route.put('/message/:id', 'MessagesController.update');
Route.delete('/message/:id', 'MessagesController.destroy');

Route.post('/cremacion', 'CremacionsController.store');
Route.get('/cremacion', 'CremacionsController.index');
Route.get('/cremacion/:id', 'CremacionsController.show');
Route.put('/cremacion/:id', 'CremacionsController.update');
Route.delete('/cremacion/:id', 'CremacionsController.destroy');

Route.post('/clients', 'ClientsController.store');
Route.get('/clients', 'ClientsController.index');
Route.put('/clients/:id', 'ClientsController.update');
Route.delete('/clients/:id', 'ClientsController.destroy');
Route.get('/clients/:id', 'ClientsController.find')


Route.post('/administrators', 'AdministratorController.store');
Route.get('/administrators', 'AdministratorController.index');
Route.put('/administrators/:id', 'AdministratorController.update');
Route.delete('/administrators/:id', 'AdministratorController.destroy');
Route.get('/administrators/:id', 'AdministratorController.find')

Route.post('/beneficiers', 'BeneficiersController.store');
Route.get('/beneficiers', 'BeneficiersController.index');
Route.put('/beneficiers/:id', 'BeneficiersController.update');
Route.delete('/beneficiers/:id', 'BeneficiersController.destroy');
Route.get('/beneficiers/:id', 'BeneficiersController.find')


Route.post('/suscription', 'SuscriptionsController.store');
Route.get('/suscription', 'SuscriptionsController.index');
Route.get('/suscription/:id', 'SuscriptionsController.find');
Route.put('/suscription/:id', 'SuscriptionsController.update');
Route.delete('/suscription/:id', 'SuscriptionsController.destroy');

Route.post('/fertro', 'FertrosController.store');
Route.get('/fertro/:id', 'FertrosController.show');

Route.post('/desplazamiento', 'DesplazamientosController.store');
Route.get('/desplazamiento/:id', 'DesplazamientosController.find');
Route.get('/desplazamientos/:id', 'DesplazamientosController.show');

Route.post('/conductor', 'ConductorsController.store');
Route.get('/conductor/:id', 'ConductorsController.show');
