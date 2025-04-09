export const moedas = [
    { nome: 'Real Brasileiro', value: 'BRL', bandeira: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/205.png' }, { nome: 'Dólar Americano', value: 'USD', bandeira: 'https://s3.static.brasilescola.uol.com.br/be/conteudo/images/estados-unidos.jpg' }, { nome: 'Peso Uruguaio', value: 'UYU' },
    { nome: 'Peso Argentino', value: 'ARS' }, { nome: 'Dólar Canadense', value: 'CAD' }, { nome: 'Peso Chileno', value: 'CLP' },
    { nome: 'Peso Colombiano', value: 'COP' }, { nome: 'Peso Cubano', value: 'CUP' }, { nome: 'Libra Esterlina', value: 'GBP' },
    { nome: 'Iene Japonês', value: 'JPY' }, { nome: 'Dólar Jamaicano', value: 'JMD' }, { nome: 'Franco Suíço', value: 'CHF' },
    { nome: 'Euro', value: 'EUR' }, { nome: 'Libra Egípcia', value: 'EGP' }, { nome: 'Yuan Chinês', value: 'CNY' },
    { nome: 'Rublo Russo', value: 'RUB' }, { nome: 'Dólar Australiano', value: 'AUD' }, { nome: 'Kwanza Angolano', value: 'AOA' },
    { nome: 'Dinar Argelino', value: 'DZD' }, { nome: 'Peso Dominicano', value: 'DOP' }, { nome: 'Coroa Dinamarquesa', value: 'DKK' }, 
    { nome: 'Dólar de Fiji', value: 'FJD' }, { nome: 'Lari Georgiano', value: 'GEL' }, { nome: 'Cedi Ganês', value: 'GHS' },
    { nome: 'Coroa Checa', value: 'CZK' }, { nome: 'Dólar de Belize', value: 'BZD' }, { nome: 'Rublo Bielorrusso', value: 'BYN' },
    { nome: 'Dólar das Bahamas', value: 'BSD' }, { nome: 'Boliviano', value: 'BOB' }, { nome: 'Dólar de Brunei', value: 'BND' },
    { nome: 'Dólar de Barbados', value: 'BBD' }, { nome: 'Dirham dos Emirados', value: 'AED' }, { nome: 'Dinar Kuwaitiano', value: 'KWD' },
    { nome: 'Won Sul-Coreano', value: 'KRW' }, { nome: 'Dólar de Trinidad', value: 'TTD' }, { nome: 'Dinar Tunisiano', value: 'TND' },
    { nome: 'Nova Lira Turca', value: 'TRY' }, { nome: 'Bolívar Venezuelano', value: 'VES' }, { nome: 'Hryvnia ucraniano', value: 'UAH' },
    { nome: 'Dólar do Caribe Oriental', value: 'XCD' }, { nome: 'Taka de Bangladesh', value: 'BDT' }, { nome: 'Rand Sul-Africano', value: 'ZAR' },
    { nome: 'Dólar Zimbabuense', value: 'ZWL' }, { nome: 'Riyal Iemenita', value: 'YER' }, { nome: 'Dólar Taiuanês', value: 'TWD' },
    { nome: 'Libra Síria', value: 'SYP' }, { nome: 'Dólar de Cingapura', value: 'SGD' }, { nome: 'Coroa Sueca', value: 'SEK' },
    { nome: 'Dinar do Bahrein', value: 'BHD' }, { nome: 'Dólar Neozelandês', value: 'NZD' }, { nome: 'Dólar de Hong Kong', value: 'HKD' },
    { nome: 'Franco da Guiné', value: 'GNF' }, { nome: 'Rupia indonésia', value: 'IDR' }, { nome: 'Dólar das Ilhas Cayman', value: 'KYD' },
    { nome: 'Tenge', value: 'KZT' }, { nome: 'Kip', value: 'LAK' }, { nome: 'Rupia do Sri Lanka', value: 'LKR' },
    { nome: 'Dólar liberiano', value: 'LRD' }, { nome: 'Dinar líbio', value: 'LYD' }, { nome: 'Dirham marroquino', value: 'MAD' },
]


export async function request(args){
    const response = await fetch(`https://v6.exchangerate-api.com/v6/ce531db59bbf57d7f539f7fd/latest/${args}`)
    const data = await response.json()
    return data.result == 'success' ? data : alert("Erro: " + data["error-type"])
}