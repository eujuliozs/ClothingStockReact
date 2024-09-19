import axios from 'axios'

class ApiConsumer
{
  baseUrl = `https://clothingstock-h5gjhdesbkfyedgn.eastus-01.azurewebsites.net/api`;

   async getToken() {
    try {
      const response = await axios.post(`${this.baseUrl}/login`,
        {
            "UserName" : "Julio",
            "PassWord" : "1234"
        }
      );
      return (await response).data.token;
    } 
    catch (error) {
      console.error('Erro ao obter o token:', error);
      throw error;
    }
  }
  
 async Get(type, id) {
    try {
      const token = await this.getToken();
      var requestString = ""

      if(id) {requestString = `${this.baseUrl}/${type}/${id}`}
      else {requestString = `${this.baseUrl}/${type}`}

      if(token)
      {
        console.log('Token:', token);
  
        const response = await axios.get(requestString, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data
      }
    }
    catch (error) {
      console.error('Erro:', error);
    }
 }


  


 async PostRequest(clothing, type) {

  function removeProperty(obj, propToRemove) {
    const { [propToRemove]: _, ...newObj } = obj;
    return newObj;
  }

  const noIdEntity = removeProperty(clothing, "id"); // retira a prop id para ter exito na requisição

  try{
    console.log("TYPE: ", type)
    console.log("Clothing obj:", noIdEntity)
    const token = await this.getToken();
    const response = await axios.post(`${this.baseUrl}/${type}`, noIdEntity, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response.data)
    return (await response).data;

  }
  catch(error)
  {
    console.error("Erro", error)
  }
  
}

 async PatchRequest(clothing, type) {
  
  const entityParams = {
    "id" : clothing.id,
    "name" : clothing.name || "",
    "stock" : clothing.stock || "",
    "description" : clothing.description || "",
    "size" : clothing.size || "",
    "imageurl" : clothing.imageurl || ""
  }

  console.log("Patch request entity params:", entityParams)
  try{
    const token = await this.getToken();
    const response = axios.patch(`${this.baseUrl}/${type}/${clothing.id}`, null, {
      params: entityParams,
      headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return (await response).data;
  }
  catch(error)
  {
    console.error(error)
  }
  
}

  async DeleteRequest(id, type)
  {
    try{
      const token = await this.getToken()
      const response = axios.delete(`${this.baseUrl}/${type}/${id}`, { 
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return (await response).data
    }
    catch(error)
    {
      console.log("Erro na requisição delete", error)
      throw error;
    }
  

  }
}
export default new ApiConsumer();