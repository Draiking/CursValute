import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ValuteInterface } from 'src/app/interface/valute.interface';
import { ApiCourseService } from 'src/app/service/api-course.service';
import * as _ from 'lodash';
import { ParserXML } from 'src/app/parser-xml';
import { ParserJSON } from 'src/app/parser-json';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  url = [
    {
      url: 'https://www.cbr-xml-daily.ru/daily_utf8.xmll',
      dataType: 'xml'
    },
    {
      url: 'https://www.cbr-xml-daily.ru/daily_json.js',
      dataType: 'json'
    }
  ];

  valutes: Array<ValuteInterface> = [];

  constructor(
    private http: HttpClient,
    private courseService: ApiCourseService
  ) { }

  ngOnInit() {
    this.getMyData();
    setInterval( () => {
      this.getMyData();
    }, 10000)
  }

  async getMyData() {
    const data = await this.getValute()
    this.valutes = this.normalize(data.list, data.type);
    console.log(this.valutes)
  }

  async getValute() {
    let i = 0;
    let len = this.url.length;
    let data: any;

    while(i < len) {
      
      data = await this.getList(this.url[i]);
      
      if (data.list || data.list.length > 0) {
          break;
      }
      i++;
    } 

    return data;
  }

  async getList(data: any) {
   const list = await this.courseService.getCourse(data.url, data.dataType);
   return {list: list, type: data.dataType}
  }

  // полиморфизм реализован обработкай разных типов данных
  normalize(list, type) {
   if (type === 'xml') {
      const xmlParser = new ParserXML(list)
      return xmlParser.normalize(list)
   } 
   if (type === 'json') {
      const jsonParser = new ParserJSON(list)
      return jsonParser.normalize(list)
   }
  }

}
