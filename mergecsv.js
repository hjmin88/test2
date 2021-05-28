const express = require('express');
const router = express.Router();
const fs = require('fs');
const parse = require('csv-parse');
const async = require('async');
const csv = require("fast-csv");

function concatCSVAndOutput(['/result_data/result_10001to10100.csv', '/result_data/result_1001to1100.csv', '/result_data/result_10101to10200.csv', '/result_data/result_101to200.csv', '/result_data/result_10201to10300.csv', '/result_data/result_10301to10400.csv', '/result_data/result_10401to10500.csv', '/result_data/result_10501to10600.csv', '/result_data/result_10601to10700.csv', '/result_data/result_10701to10800.csv', '/result_data/result_10801to10900.csv', '/result_data/result_10901to11000.csv', '/result_data/result_11001to11100.csv', '/result_data/result_1101to1200.csv', '/result_data/result_11101to11200.csv', '/result_data/result_11201to11300.csv', '/result_data/result_11301to11400.csv', '/result_data/result_11401to11500.csv', '/result_data/result_11501to11600.csv', '/result_data/result_11601to11700.csv', '/result_data/result_11701to11800.csv', '/result_data/result_11801to11900.csv', '/result_data/result_11901to12000.csv', '/result_data/result_12001to12100.csv', '/result_data/result_1201to1300.csv', '/result_data/result_12101to12200.csv', '/result_data/result_12201to12300.csv', '/result_data/result_12301to12400.csv', '/result_data/result_12401to12500.csv', '/result_data/result_12501to12600.csv', '/result_data/result_12601to12700.csv', '/result_data/result_12701to12800.csv', '/result_data/result_12801to12900.csv', '/result_data/result_12901to13000.csv', '/result_data/result_13001to13100.csv', '/result_data/result_1301to1400.csv', '/result_data/result_13101to13200.csv', '/result_data/result_13201to13300.csv', '/result_data/result_13301to13400.csv', '/result_data/result_13401to13500.csv', '/result_data/result_13501to13600.csv', '/result_data/result_13601to13700.csv', '/result_data/result_13701to13800.csv', '/result_data/result_13801to13900.csv', '/result_data/result_13901to14000.csv', '/result_data/result_14001to14100.csv', '/result_data/result_1401to1600.csv', '/result_data/result_14101to14200.csv', '/result_data/result_14201to14300.csv', '/result_data/result_14301to14400.csv', '/result_data/result_14401to14500.csv', '/result_data/result_14501to14600.csv', '/result_data/result_14601to14700.csv', '/result_data/result_14701to14800.csv', '/result_data/result_14801to14900.csv', '/result_data/result_14901to15000.csv', '/result_data/result_15001to15100.csv', '/result_data/result_15101to15200.csv', '/result_data/result_15201to15300.csv', '/result_data/result_15301to15400.csv', '/result_data/result_15401to15500.csv', '/result_data/result_15501to15600.csv', '/result_data/result_15601to15700.csv', '/result_data/result_15701to15800.csv', '/result_data/result_15801to15900.csv', '/result_data/result_15901to16000.csv', '/result_data/result_16001to16100.csv', '/result_data/result_1601to1800.csv', '/result_data/result_16101to16200.csv', '/result_data/result_16201to16300.csv', '/result_data/result_16301to16400.csv', '/result_data/result_16401to16500.csv', '/result_data/result_16501to16600.csv', '/result_data/result_16601to16800.csv', '/result_data/result_16801to17100.csv', '/result_data/result_17101to17500.csv', '/result_data/result_17501to17900.csv', '/result_data/result_17901to18300.csv', '/result_data/result_1801to1900.csv', '/result_data/result_18301to18600.csv', '/result_data/result_18601to18900.csv', '/result_data/result_18901to19200.csv', '/result_data/result_1901to2000.csv', '/result_data/result_19201to19500.csv', '/result_data/result_19501to19800.csv', '/result_data/result_19801to20200.csv', '/result_data/result_1to100.csv', '/result_data/result_2001to2100.csv', '/result_data/result_201to300.csv', '/result_data/result_20201to20600.csv', '/result_data/result_20601to21000.csv', '/result_data/result_21001to21400.csv', '/result_data/result_2101to2200.csv', '/result_data/result_21401to21800.csv', '/result_data/result_21801to22200.csv', '/result_data/result_2201to2300.csv', '/result_data/result_22201to22600.csv', '/result_data/result_22601to23000.csv', '/result_data/result_23001to23400.csv', '/result_data/result_2301to2400.csv', '/result_data/result_23401to23800.csv', '/result_data/result_23801to24200.csv', '/result_data/result_2401to2500.csv', '/result_data/result_24201to24600.csv', '/result_data/result_24601to25000.csv', '/result_data/result_25001to25400.csv', '/result_data/result_2501to2600.csv', '/result_data/result_25401to25800.csv', '/result_data/result_2601to2700.csv', '/result_data/result_2701to2800.csv', '/result_data/result_2801to2900.csv', '/result_data/result_2901to3000.csv', '/result_data/result_3001to3100.csv', '/result_data/result_301to400.csv', '/result_data/result_3101to3200.csv', '/result_data/result_3201to3300.csv', '/result_data/result_3301to3400.csv', '/result_data/result_3401to3500.csv', '/result_data/result_3501to3600.csv', '/result_data/result_3601to3700.csv', '/result_data/result_3701to3800.csv', '/result_data/result_3801to3900.csv', '/result_data/result_3901to4000.csv', '/result_data/result_4001to4100.csv', '/result_data/result_401to500.csv', '/result_data/result_4101to4200.csv', '/result_data/result_4201to4300.csv', '/result_data/result_4301to4400.csv', '/result_data/result_4401to4500.csv', '/result_data/result_4501to4600.csv', '/result_data/result_4601to4700.csv', '/result_data/result_4701to4800.csv', '/result_data/result_4801to4900.csv', '/result_data/result_4901to5000.csv', '/result_data/result_5001to5100.csv', '/result_data/result_501to600.csv', '/result_data/result_5101to5200.csv', '/result_data/result_5201to5300.csv', '/result_data/result_5301to5400.csv', '/result_data/result_5401to5500.csv', '/result_data/result_5501to5600.csv', '/result_data/result_5601to5700.csv', '/result_data/result_5701to5800.csv', '/result_data/result_5801to5900.csv', '/result_data/result_5901to6000.csv', '/result_data/result_6001to6100.csv', '/result_data/result_601to700.csv', '/result_data/result_6101to6200.csv', '/result_data/result_6201to6300.csv', '/result_data/result_6301to6400.csv', '/result_data/result_6401to6500.csv', '/result_data/result_6501to6600.csv', '/result_data/result_6601to6700.csv', '/result_data/result_6701to6800.csv', '/result_data/result_6801to6900.csv', '/result_data/result_6901to7000.csv', '/result_data/result_7001to7100.csv', '/result_data/result_701to800.csv', '/result_data/result_7101to7200.csv', '/result_data/result_7201to7300.csv', '/result_data/result_7301to7400.csv', '/result_data/result_7401to7500.csv', '/result_data/result_7501to7600.csv', '/result_data/result_7601to7700.csv', '/result_data/result_7701to7800.csv', '/result_data/result_7801to7900.csv', '/result_data/result_7901to8000.csv', '/result_data/result_8001to8100.csv', '/result_data/result_801to900.csv', '/result_data/result_8101to8200.csv', '/result_data/result_8201to8300.csv', '/result_data/result_8301to8400.csv', '/result_data/result_8401to8500.csv', '/result_data/result_8501to8600.csv', '/result_data/result_8601to8700.csv', '/result_data/result_8701to8800.csv', '/result_data/result_8801to8900.csv', '/result_data/result_8901to9000.csv', '/result_data/result_9001to9100.csv', '/result_data/result_901to1000.csv', '/result_data/result_9101to9200.csv', '/result_data/result_9201to9300.csv', '/result_data/result_9301to9400.csv', '/result_data/result_9401to9500.csv', '/result_data/result_9501to9600.csv', '/result_data/result_9601to9700.csv', '/result_data/result_9701to9800.csv', '/result_data/result_9801to9900.csv', '/result_data/result_9901to10000.csv'], '/result_data/merge/result.csv') {
    const promises = csvFilePaths.map((path) => {
        return new Promise((resolve) => {
            const dataArray = [];
            return csv
                .parseFile(path, {
                    headers: false
                })
                .on('data', function (data) {
                    dataArray.push(data);
                })
                .on('end', function () {
                    resolve(dataArray);
                });
        });
    });

    return Promise.all(promises)
        .then((results) => {

            const csvStream = csv.format({
                headers: false
            });
            const writableStream = fs.createWriteStream(outputFilePath);

            writableStream.on('finish', function () {
                console.log('DONE!');
            });

            csvStream.pipe(writableStream);
            results.forEach((result) => {
                result.forEach((data) => {
                    csvStream.write(data);
                });
            });
            csvStream.end();

        });
}