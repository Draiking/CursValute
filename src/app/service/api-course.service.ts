import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ParserJSON } from '../parser-json';
import { ParserXML } from '../parser-xml';


@Injectable({
  providedIn: 'root'
})
export class ApiCourseService {

  constructor(
    private http: HttpClient
  ) { }

  getCourse(url, type) {
    return this.http.get(url, {responseType: 'text'}).toPromise()
    .then((res) => {
      if (type === 'json') {
        const jsonParser = new ParserJSON(res);
         jsonParser.parse();
         return jsonParser.getData();
      }

      if(type === 'xml') {
        const  xmlParser = new ParserXML(res);
        xmlParser.parse();
        return xmlParser.getData();
      }
    })
    .catch( (error) => {
      console.log(error)
      return false
    }) 
  }


}
