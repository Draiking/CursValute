import { ValuteParser } from './valutes-parser';
import * as _ from 'lodash';

export class ParserJSON extends ValuteParser {

    constructor(value: any) {
        super(value)
    }

    normalize(list) {
        const valutes = [];
        _.each(list.Valute, (item) => {

            if (item.CharCode === 'EUR') {
                valutes.push(item);
            }

        })

        return valutes
    }


    parse() {
        this.data = JSON.parse(this.data);
    }

}