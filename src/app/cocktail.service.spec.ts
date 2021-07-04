import { TestBed, inject } from '@angular/core/testing';

import { CocktailService } from './cocktail.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('CocktailService', () => {
  let service: CocktailService;
  let httpMock: HttpTestingController;
  let API_PROVIDER_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CocktailService],
    });
    service = TestBed.get(CocktailService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject(
    [CocktailService],
    (service: CocktailService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('searchLocation', () => {
    it('should fetch all sub filters for selected filter "Category"', () => {
      const dummyResponse = {
        drinks: [
          {
            strCategory: 'Ordinary Drink',
          },
          {
            strCategory: 'Cocktail',
          },
          {
            strCategory: 'Milk / Float / Shake',
          },
          {
            strCategory: 'Other/Unknown',
          },
          {
            strCategory: 'Cocoa',
          },
          {
            strCategory: 'Shot',
          },
          {
            strCategory: 'Coffee / Tea',
          },
          {
            strCategory: 'Homemade Liqueur',
          },
          {
            strCategory: 'Punch / Party Drink',
          },
          {
            strCategory: 'Beer',
          },
          {
            strCategory: 'Soft Drink / Soda',
          },
        ],
      };

      service.getFilterItems('c', 'strCategory').subscribe((resp) => {
        expect(resp).toEqual(dummyResponse.drinks.map((x) => x['strCategory']));
      });

      const req = httpMock.expectOne(API_PROVIDER_URL + 'list.php?c=list');
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });

    it('throws 404 error', () => {
      service.getFilterItems('c', 'strCategory').subscribe(
        resp => fail('Should have failed with 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404);
          expect(error.error).toContain('404 error');
        }
      );
  
      const req = httpMock.expectOne(API_PROVIDER_URL + 'list.php?c=list');
      req.flush('404 error', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('getFilteredCocktails', () => {
    it('should fetch the cocktails matching the filters selected', () => {
      const dummyResponse = {"drinks":[{"strDrink":"155 Belmont","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/yqvvqs1475667388.jpg","idDrink":"15346"},{"strDrink":"57 Chevy with a White License Plate","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/qyyvtu1468878544.jpg","idDrink":"14029"},{"strDrink":"747 Drink","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/i9suxb1582474926.jpg","idDrink":"178318"},{"strDrink":"9 1\/2 Weeks","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/xvwusr1472669302.jpg","idDrink":"16108"},{"strDrink":"A Gilligan's Island","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/wysqut1461867176.jpg","idDrink":"16943"},{"strDrink":"A True Amaretto Sour","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/rptuxy1472669372.jpg","idDrink":"17005"},{"strDrink":"A.D.M. (After Dinner Mint)","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/ruxuvp1472669600.jpg","idDrink":"14560"},{"strDrink":"A1","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/2x8thr1504816928.jpg","idDrink":"17222"},{"strDrink":"Abbey Martini","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/2mcozt1504817403.jpg","idDrink":"17223"},{"strDrink":"Absolut Summertime","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/trpxxs1472669662.jpg","idDrink":"14107"},{"strDrink":"Absolutely Fabulous","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/abcpwr1504817734.jpg","idDrink":"17224"},{"strDrink":"Absolutly Screwed Up","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/yvxrwv1472669728.jpg","idDrink":"16134"},{"strDrink":"Ace","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/l3cd7f1504818306.jpg","idDrink":"17225"},{"strDrink":"Adam & Eve","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/vfeumw1504819077.jpg","idDrink":"17226"},{"strDrink":"Addington","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/ib0b7g1504818925.jpg","idDrink":"17227"},{"strDrink":"Addison","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/yzva7x1504820300.jpg","idDrink":"17228"},{"strDrink":"Addison Special","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/4vo5651493068493.jpg","idDrink":"14272"},{"strDrink":"Adios Amigos Cocktail","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/8nk2mp1504819893.jpg","idDrink":"17229"},{"strDrink":"Afterglow","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/vuquyv1468876052.jpg","idDrink":"12560"},{"strDrink":"Alice Cocktail","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/qyqtpv1468876144.jpg","idDrink":"12562"},{"strDrink":"Amaretto fizz","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/92h3jz1582474310.jpg","idDrink":"178321"},{"strDrink":"Aperol Spritz","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/iloasq1587661955.jpg","idDrink":"178325"},{"strDrink":"Apple Highball","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/66mt9b1619695719.jpg","idDrink":"178353"},{"strDrink":"Apple Karate","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/syusvw1468876634.jpg","idDrink":"12564"},{"strDrink":"Applejack","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/sutyqp1479209062.jpg","idDrink":"16311"},{"strDrink":"Aquamarine","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/zvsre31572902738.jpg","idDrink":"178319"},{"strDrink":"Arizona Stingers","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/y7w0721493068255.jpg","idDrink":"14584"},{"strDrink":"Arizona Twister","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/ido1j01493068134.jpg","idDrink":"17074"},{"strDrink":"Army special","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/55muhh1493068062.jpg","idDrink":"17066"},{"strDrink":"Autumn Garibaldi","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/ne7re71604179012.jpg","idDrink":"178337"},{"strDrink":"Aviation","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/trbplb1606855233.jpg","idDrink":"17180"},{"strDrink":"Bahama Mama","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/tyb4a41515793339.jpg","idDrink":"17267"},{"strDrink":"Banana Cream Pi","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/m5p67n1582474609.jpg","idDrink":"178320"},{"strDrink":"Bee's Knees","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/tx8ne41582475326.jpg","idDrink":"178317"},{"strDrink":"Bijou","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/rysb3r1513706985.jpg","idDrink":"17254"},{"strDrink":"Blue Hurricane","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/nwx02s1515795822.jpg","idDrink":"17268"},{"strDrink":"Blueberry Mojito","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/07iep51598719977.jpg","idDrink":"178336"},{"strDrink":"Bombay Cassis","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/h1e0e51510136907.jpg","idDrink":"17242"},{"strDrink":"Bora Bora","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/xwuqvw1473201811.jpg","idDrink":"12572"},{"strDrink":"Boulevardier","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/km84qi1513705868.jpg","idDrink":"17251"},{"strDrink":"Bounty Hunter","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/t8bgxl1596018175.jpg","idDrink":"178331"},{"strDrink":"Brigadier","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/nl89tf1518947401.jpg","idDrink":"17825"},{"strDrink":"Broadside","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/l2o6xu1582476870.jpg","idDrink":"178311"},{"strDrink":"Brooklyn","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/ojsezf1582477277.jpg","idDrink":"178310"},{"strDrink":"Butterfly Effect","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/ht3hnk1619704289.jpg","idDrink":"178356"},{"strDrink":"Captain Kidd's Punch","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/d83spj1596017390.jpg","idDrink":"178329"},{"strDrink":"Cherry Electric Lemonade","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/tquyyt1451299548.jpg","idDrink":"17174"},{"strDrink":"Corn n Oil","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/pk6dwi1592767243.jpg","idDrink":"17830"},{"strDrink":"Corpse Reviver","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/gifgao1513704334.jpg","idDrink":"17250"},{"strDrink":"Cosmopolitan","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/kpsajh1504368362.jpg","idDrink":"17196"},{"strDrink":"Cosmopolitan Martini","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/upxxpq1439907580.jpg","idDrink":"14133"},{"strDrink":"Cream Soda","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/yqstxr1479209367.jpg","idDrink":"14608"},{"strDrink":"Dark Caipirinha","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/uwstrx1472406058.jpg","idDrink":"17177"},{"strDrink":"Death in the Afternoon","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/y7s3rh1598719574.jpg","idDrink":"178334"},{"strDrink":"Dirty Martini","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/vcyvpq1485083300.jpg","idDrink":"17181"},{"strDrink":"Dry Martini","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/6ck9yi1589574317.jpg","idDrink":"11005"},{"strDrink":"Duchamp's Punch","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/g51naw1485084685.jpg","idDrink":"17182"},{"strDrink":"Elderflower Caipirinha","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/dif7a31614006331.jpg","idDrink":"178346"},{"strDrink":"Empell\u00f3n Cocina's Fat-Washed Mezcal","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/osgvxt1513595509.jpg","idDrink":"17246"},{"strDrink":"Espresso Martini","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/n0sx531504372951.jpg","idDrink":"17212"},{"strDrink":"Espresso Rumtini","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/acvf171561574403.jpg","idDrink":"178309"},{"strDrink":"Figgy Thyme","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/pbw4e51606766578.jpg","idDrink":"178344"},{"strDrink":"Flaming Lamborghini","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/yywpss1461866587.jpg","idDrink":"16485"},{"strDrink":"French Martini","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/clth721504373134.jpg","idDrink":"17213"},{"strDrink":"French Negroni","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/x8lhp41513703167.jpg","idDrink":"17248"},{"strDrink":"Fros\u00e9","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/b4cadp1619695347.jpg","idDrink":"178352"},{"strDrink":"Funk and Soul","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/qtv83q1596015790.jpg","idDrink":"178328"},{"strDrink":"Gagliardo","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/lyloe91487602877.jpg","idDrink":"12758"},{"strDrink":"Garibaldi Negroni","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/kb4bjg1604179771.jpg","idDrink":"178340"},{"strDrink":"Gimlet","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/3xgldt1513707271.jpg","idDrink":"17255"},{"strDrink":"Gin and Soda","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/nzlyc81605905755.jpg","idDrink":"178342"},{"strDrink":"Gin Basil Smash","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/jqh2141572807327.jpg","idDrink":"178314"},{"strDrink":"Gin Rickey","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/s00d6f1504883945.jpg","idDrink":"17230"},{"strDrink":"Greyhound","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/g5upn41513706732.jpg","idDrink":"17252"},{"strDrink":"Honey Bee","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/vu8l7t1582475673.jpg","idDrink":"178316"},{"strDrink":"Hot Toddy","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/ggx0lv1613942306.jpg","idDrink":"178345"},{"strDrink":"Hunter's Moon","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/t0iugg1509556712.jpg","idDrink":"17239"},{"strDrink":"Imperial Cocktail","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/bcsj2e1487603625.jpg","idDrink":"12706"},{"strDrink":"Irish Curdling Cow","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/yrhutv1503563730.jpg","idDrink":"16987"},{"strDrink":"Jitterbug","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/wwqvrq1441245318.jpg","idDrink":"16178"},{"strDrink":"Lazy Coconut Paloma","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/rytuex1598719770.jpg","idDrink":"178335"},{"strDrink":"Lemon Drop","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/mtpxgk1504373297.jpg","idDrink":"14366"},{"strDrink":"Malibu Twister","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/2dwae41504885321.jpg","idDrink":"15224"},{"strDrink":"Manhattan","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/yk70e31606771240.jpg","idDrink":"11008"},{"strDrink":"Martinez 2","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/fs6kiq1513708455.jpg","idDrink":"17256"},{"strDrink":"Martinez Cocktail","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/wwxwvr1439906452.jpg","idDrink":"11720"},{"strDrink":"Martini","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/71t8581504353095.jpg","idDrink":"11728"},{"strDrink":"Mary Pickford","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/f9erqb1504350557.jpg","idDrink":"17188"},{"strDrink":"Miami Vice","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/qvuyqw1441208955.jpg","idDrink":"13936"},{"strDrink":"Michelada","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/u736bd1605907086.jpg","idDrink":"178343"},{"strDrink":"Midnight Mint","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/svuvrq1441208310.jpg","idDrink":"14842"},{"strDrink":"Mojito","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/metwgh1606770327.jpg","idDrink":"11000"},{"strDrink":"Mojito Extra","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/vwxrsw1478251483.jpg","idDrink":"15841"},{"strDrink":"Mountain Bramble","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/stwiva1619704025.jpg","idDrink":"178355"},{"strDrink":"Munich Mule","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/rj55pl1582476101.jpg","idDrink":"178315"},{"strDrink":"New York Lemonade","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/b3n0ge1503565473.jpg","idDrink":"13204"},{"strDrink":"Oatmeal Cookie","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/bsvmlg1515792693.jpg","idDrink":"17266"},{"strDrink":"Old Fashioned","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/vrwquq1478252802.jpg","idDrink":"11001"},{"strDrink":"Old Pal","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/x03td31521761009.jpg","idDrink":"17827"},{"strDrink":"Orange Rosemary Collins","strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/mokcas1604179977.jpg","idDrink":"178341"}]}

      service.getFilteredCocktails('c','Cocktail').subscribe((resp) => {
        expect(resp).toEqual(dummyResponse.drinks)
      })

      const req = httpMock.expectOne(API_PROVIDER_URL + 'filter.php?c=Cocktail');
      expect(req.request.method).toBe('GET')
      req.flush(dummyResponse);
    })
    it('throws 404 error', () => {
      service.getFilteredCocktails('c','Cocktail').subscribe(
        resp => fail('Should have failed with 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404);
          expect(error.error).toContain('404 error');
        }
      );
  
      const req = httpMock.expectOne(API_PROVIDER_URL + 'filter.php?c=Cocktail');
      req.flush('404 error', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('searchForCocktailsMatchingQuery', () => {
    it('should fetch matching cocktails for the given user query.', () => {
      const dummyResponse = {"drinks":[{"idDrink":"13196","strDrink":"Long vodka","strDrinkAlternate":null,"strTags":null,"strVideo":null,"strCategory":"Ordinary Drink","strIBA":null,"strAlcoholic":"Alcoholic","strGlass":"Highball glass","strInstructions":"Shake a tall glass with ice cubes and Angostura, coating the inside of the glass. Por the vodka onto this, add 1 slice of lime and squeeze juice out of remainder, mix with tonic, stir and voila you have a Long Vodka","strInstructionsES":null,"strInstructionsDE":"Sch\u00fctteln Sie ein hohes Glas mit Eisw\u00fcrfeln und Angostura und beschichten Sie so die Innenseite des Glases. Den Wodka dar\u00fcber gie\u00dfen, 1 Scheibe Limette hinzuf\u00fcgen und den Saft aus dem Rest herausquetschen, mit Tonic mischen, umr\u00fchren und voila, Sie haben einen langen Wodka.","strInstructionsFR":null,"strInstructionsIT":"Agitare un bicchiere alto con cubetti di ghiaccio e angostura, ricoprendo l'interno del bicchiere.\r\nVersare la vodka su questo, aggiungere 1 fetta di lime e spremere il succo dal resto, mescolare con il tonico, mescolare e voil\u00e0 hai una Long Vodka","strInstructionsZH-HANS":null,"strInstructionsZH-HANT":null,"strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/9179i01503565212.jpg","strIngredient1":"Vodka","strIngredient2":"Lime","strIngredient3":"Angostura bitters","strIngredient4":"Tonic water","strIngredient5":"Ice","strIngredient6":null,"strIngredient7":null,"strIngredient8":null,"strIngredient9":null,"strIngredient10":null,"strIngredient11":null,"strIngredient12":null,"strIngredient13":null,"strIngredient14":null,"strIngredient15":null,"strMeasure1":"5 cl ","strMeasure2":"1\/2 ","strMeasure3":"4 dashes ","strMeasure4":"1 dl Schweppes ","strMeasure5":"4 ","strMeasure6":null,"strMeasure7":null,"strMeasure8":null,"strMeasure9":null,"strMeasure10":null,"strMeasure11":null,"strMeasure12":null,"strMeasure13":null,"strMeasure14":null,"strMeasure15":null,"strImageSource":null,"strImageAttribution":null,"strCreativeCommonsConfirmed":"No","dateModified":"2017-08-24 10:00:12"},{"idDrink":"16967","strDrink":"Vodka Fizz","strDrinkAlternate":null,"strTags":null,"strVideo":null,"strCategory":"Other\/Unknown","strIBA":null,"strAlcoholic":"Alcoholic","strGlass":"White wine glass","strInstructions":"Blend all ingredients, save nutmeg. Pour into large white wine glass and sprinkle nutmeg on top.","strInstructionsES":null,"strInstructionsDE":"Alle Zutaten mischen. In ein gro\u00dfes Wei\u00dfweinglas geben und mit Muskatnuss bestreuen.","strInstructionsFR":null,"strInstructionsIT":"Frullare tutti gli ingredienti, tranne la noce moscata.\r\nVersare in un grande bicchiere da vino bianco e cospargere di noce moscata.","strInstructionsZH-HANS":null,"strInstructionsZH-HANT":null,"strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/xwxyux1441254243.jpg","strIngredient1":"Vodka","strIngredient2":"Half-and-half","strIngredient3":"Limeade","strIngredient4":"Ice","strIngredient5":"Nutmeg","strIngredient6":null,"strIngredient7":null,"strIngredient8":null,"strIngredient9":null,"strIngredient10":null,"strIngredient11":null,"strIngredient12":null,"strIngredient13":null,"strIngredient14":null,"strIngredient15":null,"strMeasure1":"2 oz ","strMeasure2":"2 oz ","strMeasure3":"2 oz ","strMeasure4":null,"strMeasure5":null,"strMeasure6":null,"strMeasure7":null,"strMeasure8":null,"strMeasure9":null,"strMeasure10":null,"strMeasure11":null,"strMeasure12":null,"strMeasure13":null,"strMeasure14":null,"strMeasure15":null,"strImageSource":null,"strImageAttribution":null,"strCreativeCommonsConfirmed":"No","dateModified":"2015-09-03 05:24:03"},{"idDrink":"12800","strDrink":"Coffee-Vodka","strDrinkAlternate":null,"strTags":null,"strVideo":null,"strCategory":"Homemade Liqueur","strIBA":null,"strAlcoholic":"Alcoholic","strGlass":"Collins Glass","strInstructions":"Boil water and sugar until dissolved. Turn off heat. Slowly add dry instant coffee and continue stirring. Add a chopped vanilla bean to the vodka, then combine the cooled sugar syrup and coffee solution with the vodka. Cover tightly and shake vigorously each day for 3 weeks. Strain and filter. Its also best to let the sugar mixture cool completely so the vodka won't evaporate when its added. If you like a smoother feel to the liqueur you can add about 1 teaspoon of glycerine to the finished product.","strInstructionsES":null,"strInstructionsDE":"Wasser und Zucker kochen, bis sie gel\u00f6st sind. Schalten Sie die Heizung aus. Geben Sie langsam trockenen Instantkaffee hinzu und r\u00fchren Sie weiter. Dem Wodka eine gehackte Vanilleschote hinzuf\u00fcgen, dann den gek\u00fchlten Zuckersirup und die Kaffeel\u00f6sung mit dem Wodka vermengen. T\u00e4glich 3 Wochen lang fest abdecken und kr\u00e4ftig sch\u00fctteln. Abseihen und filtern. Am besten ist es auch, die Zuckermischung vollst\u00e4ndig abk\u00fchlen zu lassen, damit der Wodka nicht verdunstet, wenn er hinzugef\u00fcgt wird. Wenn Sie einen weicheren Geschmack f\u00fcr den Lik\u00f6r m\u00f6gen, k\u00f6nnen Sie dem Endprodukt etwa 1 Teel\u00f6ffel Glyzerin hinzuf\u00fcgen.","strInstructionsFR":null,"strInstructionsIT":"Far bollire l'acqua e lo zucchero fino a quando non saranno sciolti.\r\nSpegni il fuoco.\r\nAggiungere lentamente il caff\u00e8 istantaneo secco e continuare a mescolare.\r\nAggiungere un baccello di vaniglia tritato alla vodka, quindi unire lo sciroppo di zucchero raffreddato e la soluzione di caff\u00e8 con la vodka.\r\nCoprire bene e agitare vigorosamente ogni giorno per 3 settimane.\r\nFiltrare e filtrare.\r\n\u00c8 anche meglio lasciare raffreddare completamente la miscela di zucchero in modo che la vodka non evapori quando viene aggiunta.\r\nSe ti piace una sensazione pi\u00f9 liscia al liquore puoi aggiungere circa 1 cucchiaino di glicerina al prodotto finito.","strInstructionsZH-HANS":null,"strInstructionsZH-HANT":null,"strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/qvrrvu1472667494.jpg","strIngredient1":"Water","strIngredient2":"Sugar","strIngredient3":"Coffee","strIngredient4":"Vanilla","strIngredient5":"Vodka","strIngredient6":"Caramel coloring","strIngredient7":null,"strIngredient8":null,"strIngredient9":null,"strIngredient10":null,"strIngredient11":null,"strIngredient12":null,"strIngredient13":null,"strIngredient14":null,"strIngredient15":null,"strMeasure1":"2 cups ","strMeasure2":"2 cups white ","strMeasure3":"1\/2 cup instant ","strMeasure4":"1\/2","strMeasure5":"1 1\/2 cup","strMeasure6":null,"strMeasure7":null,"strMeasure8":null,"strMeasure9":null,"strMeasure10":null,"strMeasure11":null,"strMeasure12":null,"strMeasure13":null,"strMeasure14":null,"strMeasure15":null,"strImageSource":null,"strImageAttribution":null,"strCreativeCommonsConfirmed":"No","dateModified":"2016-08-31 19:18:14"},{"idDrink":"14167","strDrink":"Vodka Martini","strDrinkAlternate":null,"strTags":null,"strVideo":null,"strCategory":"Ordinary Drink","strIBA":null,"strAlcoholic":"Alcoholic","strGlass":"Cocktail glass","strInstructions":"Shake the vodka and vermouth together with a number of ice cubes, strain into a cocktail glass, add the olive and serve.","strInstructionsES":null,"strInstructionsDE":"Wodka und Wermut zusammen mit einer Reihe von Eisw\u00fcrfeln sch\u00fctteln, in ein Cocktailglas abseihen, die Olive dazugeben und servieren.","strInstructionsFR":null,"strInstructionsIT":"Shakerare la vodka e il vermouth insieme ad alcuni cubetti di ghiaccio, filtrare in una coppetta da cocktail, aggiungere l'oliva e servire.","strInstructionsZH-HANS":null,"strInstructionsZH-HANT":null,"strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/qyxrqw1439906528.jpg","strIngredient1":"Vodka","strIngredient2":"Dry Vermouth","strIngredient3":"Olive","strIngredient4":null,"strIngredient5":null,"strIngredient6":null,"strIngredient7":null,"strIngredient8":null,"strIngredient9":null,"strIngredient10":null,"strIngredient11":null,"strIngredient12":null,"strIngredient13":null,"strIngredient14":null,"strIngredient15":null,"strMeasure1":"1 1\/2 oz ","strMeasure2":"3\/4 oz ","strMeasure3":"1 ","strMeasure4":null,"strMeasure5":null,"strMeasure6":null,"strMeasure7":null,"strMeasure8":null,"strMeasure9":null,"strMeasure10":null,"strMeasure11":null,"strMeasure12":null,"strMeasure13":null,"strMeasure14":null,"strMeasure15":null,"strImageSource":null,"strImageAttribution":null,"strCreativeCommonsConfirmed":"No","dateModified":"2015-08-18 15:02:08"},{"idDrink":"15403","strDrink":"Vodka Russian","strDrinkAlternate":null,"strTags":null,"strVideo":null,"strCategory":"Ordinary Drink","strIBA":null,"strAlcoholic":"Alcoholic","strGlass":"Collins Glass","strInstructions":"Mix it as a ordinary drink .","strInstructionsES":null,"strInstructionsDE":"Mischen Sie es wie ein gew\u00f6hnliches Getr\u00e4nk.","strInstructionsFR":null,"strInstructionsIT":"Versare tutti gli ingredienti in un bicchiere, mescola bene.","strInstructionsZH-HANS":null,"strInstructionsZH-HANT":null,"strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/rpttur1454515129.jpg","strIngredient1":"Vodka","strIngredient2":"Schweppes Russchian","strIngredient3":null,"strIngredient4":null,"strIngredient5":null,"strIngredient6":null,"strIngredient7":null,"strIngredient8":null,"strIngredient9":null,"strIngredient10":null,"strIngredient11":null,"strIngredient12":null,"strIngredient13":null,"strIngredient14":null,"strIngredient15":null,"strMeasure1":"2 oz ","strMeasure2":null,"strMeasure3":null,"strMeasure4":null,"strMeasure5":null,"strMeasure6":null,"strMeasure7":null,"strMeasure8":null,"strMeasure9":null,"strMeasure10":null,"strMeasure11":null,"strMeasure12":null,"strMeasure13":null,"strMeasure14":null,"strMeasure15":null,"strImageSource":null,"strImageAttribution":null,"strCreativeCommonsConfirmed":"No","dateModified":"2016-02-03 15:58:49"},{"idDrink":"12460","strDrink":"Vodka And Tonic","strDrinkAlternate":null,"strTags":null,"strVideo":null,"strCategory":"Ordinary Drink","strIBA":null,"strAlcoholic":"Alcoholic","strGlass":"Highball glass","strInstructions":"Pour vodka into a highball glass over ice cubes. Fill with tonic water, stir, and serve.","strInstructionsES":null,"strInstructionsDE":"Gie\u00dfen Sie Wodka in ein Highball-Glas \u00fcber Eisw\u00fcrfel. Mit Tonic Water auff\u00fcllen, umr\u00fchren und servieren.","strInstructionsFR":null,"strInstructionsIT":"Versare la vodka in un bicchiere highball sopra i cubetti di ghiaccio. Riempi con acqua tonica, mescola e servi.","strInstructionsZH-HANS":null,"strInstructionsZH-HANT":null,"strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/lmj2yt1504820500.jpg","strIngredient1":"Vodka","strIngredient2":"Tonic water","strIngredient3":null,"strIngredient4":null,"strIngredient5":null,"strIngredient6":null,"strIngredient7":null,"strIngredient8":null,"strIngredient9":null,"strIngredient10":null,"strIngredient11":null,"strIngredient12":null,"strIngredient13":null,"strIngredient14":null,"strIngredient15":null,"strMeasure1":"2 oz ","strMeasure2":null,"strMeasure3":null,"strMeasure4":null,"strMeasure5":null,"strMeasure6":null,"strMeasure7":null,"strMeasure8":null,"strMeasure9":null,"strMeasure10":null,"strMeasure11":null,"strMeasure12":null,"strMeasure13":null,"strMeasure14":null,"strMeasure15":null,"strImageSource":null,"strImageAttribution":null,"strCreativeCommonsConfirmed":"No","dateModified":"2017-09-07 22:41:40"}]}

      service.searchForCocktailsMatchingQuery("s","vodka").subscribe((resp) => {
        expect(resp).toEqual(dummyResponse.drinks)
      })

      const req = httpMock.expectOne(API_PROVIDER_URL + 'search.php?s=vodka');
      expect(req.request.method).toBe('GET')
      req.flush(dummyResponse);
    });

    it('throws 404 error', () => {
      service.searchForCocktailsMatchingQuery("s","vodka").subscribe(
        resp => fail('Should have failed with 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404);
          expect(error.error).toContain('404 error');
        }
      );
  
      const req = httpMock.expectOne(API_PROVIDER_URL + 'search.php?s=vodka');
      req.flush('404 error', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('getDetailsOfCocktailById', () => {
    it('should fetch cocktail details by the ID provided', () => {
      const dummyResponse = {"drinks":[{"idDrink":"13196","strDrink":"Long vodka","strDrinkAlternate":null,"strTags":null,"strVideo":null,"strCategory":"Ordinary Drink","strIBA":null,"strAlcoholic":"Alcoholic","strGlass":"Highball glass","strInstructions":"Shake a tall glass with ice cubes and Angostura, coating the inside of the glass. Por the vodka onto this, add 1 slice of lime and squeeze juice out of remainder, mix with tonic, stir and voila you have a Long Vodka","strInstructionsES":null,"strInstructionsDE":"Sch\u00fctteln Sie ein hohes Glas mit Eisw\u00fcrfeln und Angostura und beschichten Sie so die Innenseite des Glases. Den Wodka dar\u00fcber gie\u00dfen, 1 Scheibe Limette hinzuf\u00fcgen und den Saft aus dem Rest herausquetschen, mit Tonic mischen, umr\u00fchren und voila, Sie haben einen langen Wodka.","strInstructionsFR":null,"strInstructionsIT":"Agitare un bicchiere alto con cubetti di ghiaccio e angostura, ricoprendo l'interno del bicchiere.\r\nVersare la vodka su questo, aggiungere 1 fetta di lime e spremere il succo dal resto, mescolare con il tonico, mescolare e voil\u00e0 hai una Long Vodka","strInstructionsZH-HANS":null,"strInstructionsZH-HANT":null,"strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/9179i01503565212.jpg","strIngredient1":"Vodka","strIngredient2":"Lime","strIngredient3":"Angostura bitters","strIngredient4":"Tonic water","strIngredient5":"Ice","strIngredient6":null,"strIngredient7":null,"strIngredient8":null,"strIngredient9":null,"strIngredient10":null,"strIngredient11":null,"strIngredient12":null,"strIngredient13":null,"strIngredient14":null,"strIngredient15":null,"strMeasure1":"5 cl ","strMeasure2":"1\/2 ","strMeasure3":"4 dashes ","strMeasure4":"1 dl Schweppes ","strMeasure5":"4 ","strMeasure6":null,"strMeasure7":null,"strMeasure8":null,"strMeasure9":null,"strMeasure10":null,"strMeasure11":null,"strMeasure12":null,"strMeasure13":null,"strMeasure14":null,"strMeasure15":null,"strImageSource":null,"strImageAttribution":null,"strCreativeCommonsConfirmed":"No","dateModified":"2017-08-24 10:00:12"}]}

      service.getDetailsOfCocktailById(13196).subscribe((resp) => {
        expect(resp).toEqual(dummyResponse.drinks)
      })

      const req = httpMock.expectOne(API_PROVIDER_URL + 'lookup.php?i=13196');
      expect(req.request.method).toBe('GET')
      req.flush(dummyResponse);
    })

    it('throws 404 error', () => {
      service.getDetailsOfCocktailById(13196).subscribe(
        resp => fail('Should have failed with 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404);
          expect(error.error).toContain('404 error');
        }
      );
  
      const req = httpMock.expectOne(API_PROVIDER_URL + 'lookup.php?i=13196');
      req.flush('404 error', { status: 404, statusText: 'Not Found' });
    });
  })
});
