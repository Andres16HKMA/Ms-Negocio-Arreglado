import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env'
import { ModelObject } from '@ioc:Adonis/Lucid/Orm';
import Beneficier from 'App/Models/Beneficier';
import BeneficierValidator from 'App/Validators/BeneficierValidator';

export default class BeneficiersController {
    public async find({ request, params }: HttpContextContract) {
        let theRequest = request.toJSON()
        const beneficiers: ModelObject[] = [];
        const { page, per_page } = request.only(["page", "per_page"]);
        let thePermission: object = {
            url: theRequest.url,
            method: theRequest.method
          }
        if (params.id) {
          const theBeneficier: Beneficier = await Beneficier.findOrFail(params.id);
          beneficiers.push(theBeneficier);
        } else if (page && per_page) {
          const { meta, data } = await Beneficier.query()
            .paginate(page, per_page)
            .then((res) => res.toJSON())
            
          await Promise.all(
            data.map(async (benef: Beneficier) => {
              const res = await axios.get(`${Env.get("MS_SECURITY")}/api/public/users/${benef.user_id}`, thePermission)
              const { _id, name, email } = res.data;
              const { id, document, celphone, client_id } = benef;
              beneficiers.push({
                id,
                user_id: _id,
                name,
                email,
                document,
                celphone,
                client_id
              });
            }),
          );
    
          return { meta, data: beneficiers };
        } else {
          const allBeneficier = await Beneficier.all();
          beneficiers.push(...allBeneficier.map((c) => c.toJSON()));
        }
        
    
        await Promise.all(beneficiers.map(async (benef: Beneficier, index: number) => {
            const res = await axios.get(`${Env.get("MS_SECURITY")}/api/public/users/${benef.user_id}`, thePermission 
            );
            const { _id, name, email } = res.data;
            const { id, document, celphone, client_id } = benef;
            beneficiers[index] = {
              id,
              user_id: _id,
              name,
              email,
              document,
              celphone,
              client_id
            };
          }),
        );
    
        return beneficiers;
      }
    public async store({request}:HttpContextContract){
        const body = await request.validate(BeneficierValidator)
        const theBeneficier=await Beneficier.create(body)
        return theBeneficier;
    }
    public async index({request}: HttpContextContract){
        const page =request.input('page', 1);
        const perPage = request.input("per_page", 20)
        let benef:Beneficier[]=await Beneficier.query().paginate(page, perPage)
        return benef;  
    }
    public async update({params, request}: HttpContextContract){
        const body = request.body();
        const theBeneficier: Beneficier = await Beneficier.findOrFail(params.id);
        theBeneficier.celphone = body.celphone;
        theBeneficier.document = body.document;
        theBeneficier.client_id=body.client_id

        return theBeneficier.save();
    }
    public async destroy({params, response}: HttpContextContract){
        const theBeneficier: Beneficier = await Beneficier.findOrFail(params.id);
        response.status(204);
        return theBeneficier.delete()
    }
}
