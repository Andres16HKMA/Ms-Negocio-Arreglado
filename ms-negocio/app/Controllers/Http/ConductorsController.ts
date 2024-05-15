import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conductor from 'App/Models/Conductor';

import ConductorValidator from 'App/Validators/ConductorValidator';

export default class ConductorController {
      public async store({request}:HttpContextContract){
        const body = await request.validate(ConductorValidator)
        const theConductor=await Conductor.create(body)
        return theConductor;
    }
    public async index({request}: HttpContextContract){
        const page =request.input('page', 1);
        const perPage = request.input("per_page", 20)
        let conductor:Conductor[]=await Conductor.query().paginate(page, perPage)
        return conductor;  
    }
    public async show({params}:HttpContextContract){
        return Conductor.findOrFail(params.id)
    }
    public async update({params, request}: HttpContextContract){
        const body = request.body();
        const theConductor: Conductor = await Conductor.findOrFail(params.id);
        theConductor.carmodel = body.carModel;
        theConductor.document = body.document;

        return theConductor.save();
    }
    public async destroy({params, response}: HttpContextContract){
        const theConductor: Conductor = await Conductor.findOrFail(params.id);
        response.status(204);
        return theConductor.delete()
    }
}

