import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Departament from 'App/Models/Departament';

export default class DepartmentsController {
    // create
    public async store({request}:HttpContextContract){
        let body=request.body();
        const theDepartament=await Departament.create(body);
        return theDepartament;
    }

    // get
    public async index({request}: HttpContextContract){
        const page = request.input('page', 1);
        const perPage = request.input('perPage', 20);
        let departaments:Departament[]= await Departament.query().paginate(page, perPage)
        return departaments;
    }
    public async show({params}: HttpContextContract){
        return Departament.findOrFail(params.id);
    }

    // update
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theDepartament: Departament = await Departament.findOrFail(params.id);
        theDepartament.name = body.name;
        return await theDepartament.save();
    }

    // delete
    public async delete({ params, response }: HttpContextContract) {
        const theDepartament: Departament = await Departament.findOrFail(params.id);
        response.status(204);
        return await theDepartament.delete();
    }
}