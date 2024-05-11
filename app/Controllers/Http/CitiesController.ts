import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import City from 'App/Models/City';

export default class CitiesController {
    // create
    public async store({request}:HttpContextContract){
        let body=request.body();
        const theCity=await City.create(body);
        return theCity;
    }

    // get
    public async index({request}: HttpContextContract){
        const page = request.input('page', 1);
        const perPage = request.input('perPage', 20);
        let cities:City[]= await City.query().paginate(page, perPage)
        return cities;
    }
    public async show({params}: HttpContextContract){
        return City.findOrFail(params.id);
    }

    // update
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theCity: City = await City.findOrFail(params.id);
        theCity.name = body.name;
        theCity.quan_sites = body.quan_sites;
        return await theCity.save();
    }
    

    // delete
    public async delete({ params, response }: HttpContextContract) {
        const theCity: City = await City.findOrFail(params.id);
        response.status(204);
        return await theCity.delete();
    }
    
}
