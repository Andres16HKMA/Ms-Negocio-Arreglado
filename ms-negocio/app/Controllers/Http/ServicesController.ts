import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service';
import ServiceValidator from 'App/Validators/ServiceValidator';

export default class ServicesController {
    // create
    public async store({request}:HttpContextContract){
        const body = await request.validate(ServiceValidator)
        const theService=await Service.create(body);
        return theService;
    }

    // get
    public async index({request}: HttpContextContract){
        const page = request.input('page', 1);
        const perPage = request.input('perPage', 20);
        let services:Service[]= await Service.query().paginate(page, perPage)
        return services;
    }
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theService = await Service.findOrFail(params.id);
            await theService.load("cremation")
            await theService.load("grave")
            await theService.load("transfer")

            return theService;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Service.query().paginate(page, perPage)
            } else {
                return await Service.query()
            }

        }

    }

    // update
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theService: Service = await Service.findOrFail(params.id);
        theService.direction = body.direction;
        return await theService.save();
    }

    // delete
    public async delete({ params, response }: HttpContextContract) {
        const theService: Service = await Service.findOrFail(params.id);
        response.status(204);
        return await theService.delete();
    }
}

