const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio');

const Team = require('./models/Team');

const urlMainPage = 'https://fr.uefa.com/uefachampionsleague/season=2019/clubs/';
const urlClubJuventus = 'https://fr.uefa.com/uefachampionsleague/season=2019/clubs/club=50139/';
const localMainPage = './public/mainPage.html';
const localClubJuventus = './public/clubJuventus.html';
const localImgDir = 'public/img/';

function writeFile(url, outputPath) {
    https.get(url, (res) => {
        res.pipe(fs.createWriteStream(outputPath))
    })
}

function parseFiles() {
    fs.readFile(localMainPage, (err, file)=> {
        if(err) console.log('error : '+err);
        const $ = cheerio.load(file.toString());

        var logos = [];
        var names = [];

        $('.club-logo').each((index, element) => {
            url = element.attribs.style;
            url = url.replace("background-image:url('",'').replace("')", '');
            var name = url.split('140X140\/').pop();
            logos.push(url);
            names.push(name);
        });

        // logos.forEach(function (logo, index)  {

        //         https.get(logo, result => {

        //             result.pipe(fs.createWriteStream(localImgDir+names[index]))
        //             result.on('end', err => {

        //                 if(err) console.log('error : ' +err);
        //                 console.log('Files saved');

        //             });
        //         });
        // });

        $('.team-is-club').each((index, element) => {
            var team = $('.team-name',element).text();
            var teamName = team.split('(')[0];
            var teamCountry = team.split('(')[1].replace(')', '');
            console.log(teamCountry);
        })
    });



    fs.readFile(localClubJuventus, (err, file)=> {
        if(err) console.log('error : '+err);
        const $ = cheerio.load(file.toString());

        $('.squad--team-player').each((index, element) => {
            var playerRole = $('.squad--player-role',element).text();
            var playerNum = $('.squad--player-num',element).text();
            var playerName = $('.squad--player-img',element).attr('title');
            if(playerName) { playerName = playerName.valueOf();}
            console.log(playerName);
        })
    })
}


writeFile(urlMainPage, localMainPage);
writeFile(urlClubJuventus, localClubJuventus);
parseFiles();