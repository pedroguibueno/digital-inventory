export default class MoneyUtils {

    static formatMoney(value: string):string {
        if(value === null) return value;
        value = value.replace(/\D/g, '');
        const numValue = +value;
        value = numValue.toString();
    
        if(value.length < 3){
          let x = value.match(/(\d{0,2})/) || "";
          value = (x[1].length == 1 ? '0,0' : '0,') + x[1];
        } else {
          let x = value.match(/(\d{0,50})(\d{2})/) || "";
          value = x[1] + ',' + x[2];
        }
    
        // add dots each 3 numbers
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
        return  "R$ " + value;
    }
    
}