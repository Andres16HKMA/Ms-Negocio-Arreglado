import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hall from 'App/Models/Hall';

export default class HallsController {
    // create
    public async store({request}:HttpContextContract){
        let body=request.body();
        const theHall=await Hall.create(body);
        return theHall;
    }

    // get
    public async index({request}: HttpContextContract){
        const page = request.input('page', 1);
        const perPage = request.input('perPage', 20);
        let halls:Hall[]= await Hall.query().paginate(page, perPage)
        return halls;
    }
    public async show({params}: HttpContextContract){
        return Hall.findOrFail(params.id);
    }

    // update
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theHall: Hall = await Hall.findOrFail(params.id);
        theHall.quan_assis = body.quan_assis;
        theHall.quan_decea = body.quan_decea;
        return await theHall.save();
    }

    // delete
    public async delete({ params, response }: HttpContextContract) {
        const theHall: Hall = await Hall.findOrFail(params.id);
        response.status(204);
        return await theHall.delete();
    }
}
