// 크롤링 패키지
const rp = require('request-promise');
const cheerio = require('cheerio');

// 한글 인코딩 패키지
const {
    Iconv
} = require("iconv");
const jschardet = require('jschardet');

// csv 저장 패키지
var fs = require('fs');

function anyToUtf8(str) {
    const {
        encoding
    } = jschardet.detect(str);
    const iconv = new Iconv(encoding, 'utf-8//translit//ignore');
    return iconv.convert(str).toString();
}

const datList2 = [];
let cnt = 0;

let startNum = 26201;
let endNum = 26600;

for (let i = startNum; i < endNum + 1; i++) {

    let num = i; //12744
    const url = "https://www.dentalemart.co.kr/product/p_detail.html?num=" + num;
    const datList = [];

    rp({
            url: url,
            encoding: null
        }).then(anyToUtf8)
        .then(function (htmlString) {
            let $ = cheerio.load(htmlString);
            let $priceDiv = $("input[name=p_num]").next().next().children();

            const pNum = $("input[name=p_num]"); //12744
            const pCat1 = $(".cat_font").next(); //Dental Clinic
            const pCat2 = pCat1.next().next().children(); //진료용 기구, 덴티폼
            const pCat3 = pCat2.parent().next().next().children(); //진단용 기구
            const pCat4 = pCat3.parent().next().next().children(); //Explorer
            const pName = $("input[name=p_num]").next(); //TOWNE Explorer (126-206) 신용덴탈
            const pPrice1 = $("td:contains('소비자 가격')").next().children(); //7,000
            const pPrice2 = $("td:contains('특판 가격')").next().children(); //5,500
            const pPrice3 = $("td:contains('DV패밀리 가격')").next().children(); //5,500
            const pUnit = $("td:contains('판매단위')").next(); //1EA
            const pBrand = $("td:contains('제조사/원산지')").next(); //Pakistan

            datList.push(String(pNum.val()).replaceAll(',', '').replaceAll('undefined', num + '에 상품없음'));
            datList.push(pCat2.text().replaceAll(',', ''));
            datList.push(pCat3.text().replaceAll(',', ''));
            datList.push(pCat4.text().replaceAll(',', ''));
            datList.push(pName.text().replaceAll(',', ''));
            datList.push(pPrice1.text().replaceAll(',', ''));
            datList.push(pPrice2.text().replaceAll(',', ''));
            datList.push(pPrice3.text().trim().replaceAll(',', ''));
            datList.push(pUnit.text().replaceAll(',', ''));
            datList.push(pBrand.text().replaceAll(',', ''));

            datList2.push(datList);

            cnt = cnt + 1;

            if (cnt == endNum - startNum + 1) {
                console.log(datList2);
                const datList3 = datList2.map((row) => row.join(',')).join('\n');
                fs.writeFileSync('c:/mydev/mlsv/result_data/result_' + startNum + 'to' + endNum + '.csv', '\uFEFF' + datList3);
                console.log(startNum + "to" + endNum + " 파일 생성이 완료됐습니다.\n\n다음 순서 :\nlet startNum = " + Number(endNum + 1) + ";\nlet endNum = " + Number(endNum + 400) + ";");
            }
        })
        .catch(function (err) {
            console.log(err)
        });
}