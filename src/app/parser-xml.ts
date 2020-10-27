import * as converter from 'xml-js';
import { ValuteParser } from './valutes-parser';
import * as _ from 'lodash';

// реалтзовано наследование от ValuteParser 
export class ParserXML extends ValuteParser {

    constructor(value: any) {
        super(value)
    }

    parse() {
        this.data = this.parseXmlToJson(this.data);
    }


    normalize(list) {
        const valutes = [];
        _.each(list.Valute, (item) => {

            if (typeof item.CharCode === 'object' && item.CharCode._text === 'EUR') {
                valutes.push({
                    Name: item.CharCode._text,
                    Value: item.Value._text
                })

            }

        })
        return valutes
    }

    public getData(): any {
        return this.data.ValCurs;
    }

    // здесь реализована инкапсуляция путем создания модификаторов доступа
    private parseXmlToJson(xml) {
        let result1 = converter.xml2json(xml, { compact: true, spaces: 2 });
        return JSON.parse(result1);
    }

}