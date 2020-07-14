# 日期和时间模块-`pytz`时区模块

[[toc]]

## 介绍

pypi上面pytz模块的介绍是`World timezone definitions, modern and historical`，即世界野区定义，现代的和历史的。

> pytz brings the Olson tz database into Python. This library allows accurate and cross platform timezone calculations using Python 2.4 or higher. It also solves the issue of ambiguous times at the end of daylight saving time, which you can read more about in the Python Library Reference (`datetime.tzinfo`).
>
> Almost all of the Olson timezones are supported.

pytz将Olson tz数据库带入Python。 该库允许使用Python 2.4或更高版本进行准确的跨平台时区计算。 它还解决了夏令时结束时时间模糊的问题，您可以在Python库参考(`datetime.tzinfo`)中了解更多信息。

几乎所有的Olson时区都受支持。

## 安装

```sh
$ pip install pytz
Looking in indexes: http://mirrors.aliyun.com/pypi/simple/
Requirement already satisfied: pytz in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (2020.1)
```

查看`pytz`模块有哪些函数或方法：

```py
$ python3
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
[GCC 4.2.1 (Apple Inc. build 5666) (dot 3)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import pytz
>>> pytz.
pytz.all_timezones         pytz.country_timezones(    pytz.LazySet(              pytz.tzfile
pytz.all_timezones_set     pytz.datetime              pytz.NonExistentTimeError( pytz.tzinfo
pytz.AmbiguousTimeError(   pytz.exceptions            pytz.OLSEN_VERSION         pytz.unicode(
pytz.ascii(                pytz.FixedOffset(          pytz.OLSON_VERSION         pytz.UnknownTimeZoneError(
pytz.BaseTzInfo(           pytz.HOUR                  pytz.open_resource(        pytz.unpickler(
pytz.build_tzinfo(         pytz.InvalidTimeError(     pytz.os                    pytz.utc
pytz.common_timezones      pytz.lazy                  pytz.resource_exists(      pytz.UTC
pytz.common_timezones_set  pytz.LazyDict(             pytz.sys                   pytz.VERSION
pytz.country_names         pytz.LazyList(             pytz.timezone(             pytz.ZERO
>>> exit()
```

## 使用

### 查看所有的时区列表

```python
>>> from pprint import pprint as print

>>> print(pytz.all_timezones)
['Africa/Abidjan',
 'Africa/Accra',
 'Africa/Addis_Ababa',
 'Africa/Algiers',
 'Africa/Asmara',
 'Africa/Asmera',
 'Africa/Bamako',
 'Africa/Bangui',
 'Africa/Banjul',
 'Africa/Bissau',
 'Africa/Blantyre',
 'Africa/Brazzaville',
 'Africa/Bujumbura',
 'Africa/Cairo',
 'Africa/Casablanca',
 'Africa/Ceuta',
 'Africa/Conakry',
 'Africa/Dakar',
 'Africa/Dar_es_Salaam',
 'Africa/Djibouti',
 'Africa/Douala',
 'Africa/El_Aaiun',
 'Africa/Freetown',
 'Africa/Gaborone',
 'Africa/Harare',
 'Africa/Johannesburg',
 'Africa/Juba',
 'Africa/Kampala',
 'Africa/Khartoum',
 'Africa/Kigali',
 'Africa/Kinshasa',
 'Africa/Lagos',
 'Africa/Libreville',
 'Africa/Lome',
 'Africa/Luanda',
 'Africa/Lubumbashi',
 'Africa/Lusaka',
 'Africa/Malabo',
 'Africa/Maputo',
 'Africa/Maseru',
 'Africa/Mbabane',
 'Africa/Mogadishu',
 'Africa/Monrovia',
 'Africa/Nairobi',
 'Africa/Ndjamena',
 'Africa/Niamey',
 'Africa/Nouakchott',
 'Africa/Ouagadougou',
 'Africa/Porto-Novo',
 'Africa/Sao_Tome',
 'Africa/Timbuktu',
 'Africa/Tripoli',
 'Africa/Tunis',
 'Africa/Windhoek',
 'America/Adak',
 'America/Anchorage',
 'America/Anguilla',
 'America/Antigua',
 'America/Araguaina',
 'America/Argentina/Buenos_Aires',
 'America/Argentina/Catamarca',
 'America/Argentina/ComodRivadavia',
 'America/Argentina/Cordoba',
 'America/Argentina/Jujuy',
 'America/Argentina/La_Rioja',
 'America/Argentina/Mendoza',
 'America/Argentina/Rio_Gallegos',
 'America/Argentina/Salta',
 'America/Argentina/San_Juan',
 'America/Argentina/San_Luis',
 'America/Argentina/Tucuman',
 'America/Argentina/Ushuaia',
 'America/Aruba',
 'America/Asuncion',
 'America/Atikokan',
 'America/Atka',
 'America/Bahia',
 'America/Bahia_Banderas',
 'America/Barbados',
 'America/Belem',
 'America/Belize',
 'America/Blanc-Sablon',
 'America/Boa_Vista',
 'America/Bogota',
 'America/Boise',
 'America/Buenos_Aires',
 'America/Cambridge_Bay',
 'America/Campo_Grande',
 'America/Cancun',
 'America/Caracas',
 'America/Catamarca',
 'America/Cayenne',
 'America/Cayman',
 'America/Chicago',
 'America/Chihuahua',
 'America/Coral_Harbour',
 'America/Cordoba',
 'America/Costa_Rica',
 'America/Creston',
 'America/Cuiaba',
 'America/Curacao',
 'America/Danmarkshavn',
 'America/Dawson',
 'America/Dawson_Creek',
 'America/Denver',
 'America/Detroit',
 'America/Dominica',
 'America/Edmonton',
 'America/Eirunepe',
 'America/El_Salvador',
 'America/Ensenada',
 'America/Fort_Nelson',
 'America/Fort_Wayne',
 'America/Fortaleza',
 'America/Glace_Bay',
 'America/Godthab',
 'America/Goose_Bay',
 'America/Grand_Turk',
 'America/Grenada',
 'America/Guadeloupe',
 'America/Guatemala',
 'America/Guayaquil',
 'America/Guyana',
 'America/Halifax',
 'America/Havana',
 'America/Hermosillo',
 'America/Indiana/Indianapolis',
 'America/Indiana/Knox',
 'America/Indiana/Marengo',
 'America/Indiana/Petersburg',
 'America/Indiana/Tell_City',
 'America/Indiana/Vevay',
 'America/Indiana/Vincennes',
 'America/Indiana/Winamac',
 'America/Indianapolis',
 'America/Inuvik',
 'America/Iqaluit',
 'America/Jamaica',
 'America/Jujuy',
 'America/Juneau',
 'America/Kentucky/Louisville',
 'America/Kentucky/Monticello',
 'America/Knox_IN',
 'America/Kralendijk',
 'America/La_Paz',
 'America/Lima',
 'America/Los_Angeles',
 'America/Louisville',
 'America/Lower_Princes',
 'America/Maceio',
 'America/Managua',
 'America/Manaus',
 'America/Marigot',
 'America/Martinique',
 'America/Matamoros',
 'America/Mazatlan',
 'America/Mendoza',
 'America/Menominee',
 'America/Merida',
 'America/Metlakatla',
 'America/Mexico_City',
 'America/Miquelon',
 'America/Moncton',
 'America/Monterrey',
 'America/Montevideo',
 'America/Montreal',
 'America/Montserrat',
 'America/Nassau',
 'America/New_York',
 'America/Nipigon',
 'America/Nome',
 'America/Noronha',
 'America/North_Dakota/Beulah',
 'America/North_Dakota/Center',
 'America/North_Dakota/New_Salem',
 'America/Nuuk',
 'America/Ojinaga',
 'America/Panama',
 'America/Pangnirtung',
 'America/Paramaribo',
 'America/Phoenix',
 'America/Port-au-Prince',
 'America/Port_of_Spain',
 'America/Porto_Acre',
 'America/Porto_Velho',
 'America/Puerto_Rico',
 'America/Punta_Arenas',
 'America/Rainy_River',
 'America/Rankin_Inlet',
 'America/Recife',
 'America/Regina',
 'America/Resolute',
 'America/Rio_Branco',
 'America/Rosario',
 'America/Santa_Isabel',
 'America/Santarem',
 'America/Santiago',
 'America/Santo_Domingo',
 'America/Sao_Paulo',
 'America/Scoresbysund',
 'America/Shiprock',
 'America/Sitka',
 'America/St_Barthelemy',
 'America/St_Johns',
 'America/St_Kitts',
 'America/St_Lucia',
 'America/St_Thomas',
 'America/St_Vincent',
 'America/Swift_Current',
 'America/Tegucigalpa',
 'America/Thule',
 'America/Thunder_Bay',
 'America/Tijuana',
 'America/Toronto',
 'America/Tortola',
 'America/Vancouver',
 'America/Virgin',
 'America/Whitehorse',
 'America/Winnipeg',
 'America/Yakutat',
 'America/Yellowknife',
 'Antarctica/Casey',
 'Antarctica/Davis',
 'Antarctica/DumontDUrville',
 'Antarctica/Macquarie',
 'Antarctica/Mawson',
 'Antarctica/McMurdo',
 'Antarctica/Palmer',
 'Antarctica/Rothera',
 'Antarctica/South_Pole',
 'Antarctica/Syowa',
 'Antarctica/Troll',
 'Antarctica/Vostok',
 'Arctic/Longyearbyen',
 'Asia/Aden',
 'Asia/Almaty',
 'Asia/Amman',
 'Asia/Anadyr',
 'Asia/Aqtau',
 'Asia/Aqtobe',
 'Asia/Ashgabat',
 'Asia/Ashkhabad',
 'Asia/Atyrau',
 'Asia/Baghdad',
 'Asia/Bahrain',
 'Asia/Baku',
 'Asia/Bangkok',
 'Asia/Barnaul',
 'Asia/Beirut',
 'Asia/Bishkek',
 'Asia/Brunei',
 'Asia/Calcutta',
 'Asia/Chita',
 'Asia/Choibalsan',
 'Asia/Chongqing',
 'Asia/Chungking',
 'Asia/Colombo',
 'Asia/Dacca',
 'Asia/Damascus',
 'Asia/Dhaka',
 'Asia/Dili',
 'Asia/Dubai',
 'Asia/Dushanbe',
 'Asia/Famagusta',
 'Asia/Gaza',
 'Asia/Harbin',
 'Asia/Hebron',
 'Asia/Ho_Chi_Minh',
 'Asia/Hong_Kong',
 'Asia/Hovd',
 'Asia/Irkutsk',
 'Asia/Istanbul',
 'Asia/Jakarta',
 'Asia/Jayapura',
 'Asia/Jerusalem',
 'Asia/Kabul',
 'Asia/Kamchatka',
 'Asia/Karachi',
 'Asia/Kashgar',
 'Asia/Kathmandu',
 'Asia/Katmandu',
 'Asia/Khandyga',
 'Asia/Kolkata',
 'Asia/Krasnoyarsk',
 'Asia/Kuala_Lumpur',
 'Asia/Kuching',
 'Asia/Kuwait',
 'Asia/Macao',
 'Asia/Macau',
 'Asia/Magadan',
 'Asia/Makassar',
 'Asia/Manila',
 'Asia/Muscat',
 'Asia/Nicosia',
 'Asia/Novokuznetsk',
 'Asia/Novosibirsk',
 'Asia/Omsk',
 'Asia/Oral',
 'Asia/Phnom_Penh',
 'Asia/Pontianak',
 'Asia/Pyongyang',
 'Asia/Qatar',
 'Asia/Qostanay',
 'Asia/Qyzylorda',
 'Asia/Rangoon',
 'Asia/Riyadh',
 'Asia/Saigon',
 'Asia/Sakhalin',
 'Asia/Samarkand',
 'Asia/Seoul',
 'Asia/Shanghai',                   # 这个是亚洲/上海，代码中国的时区
 'Asia/Singapore',
 'Asia/Srednekolymsk',
 'Asia/Taipei',
 'Asia/Tashkent',
 'Asia/Tbilisi',
 'Asia/Tehran',
 'Asia/Tel_Aviv',
 'Asia/Thimbu',
 'Asia/Thimphu',
 'Asia/Tokyo',
 'Asia/Tomsk',
 'Asia/Ujung_Pandang',
 'Asia/Ulaanbaatar',
 'Asia/Ulan_Bator',
 'Asia/Urumqi',
 'Asia/Ust-Nera',
 'Asia/Vientiane',
 'Asia/Vladivostok',
 'Asia/Yakutsk',
 'Asia/Yangon',
 'Asia/Yekaterinburg',
 'Asia/Yerevan',
 'Atlantic/Azores',
 'Atlantic/Bermuda',
 'Atlantic/Canary',
 'Atlantic/Cape_Verde',
 'Atlantic/Faeroe',
 'Atlantic/Faroe',
 'Atlantic/Jan_Mayen',
 'Atlantic/Madeira',
 'Atlantic/Reykjavik',
 'Atlantic/South_Georgia',
 'Atlantic/St_Helena',
 'Atlantic/Stanley',
 'Australia/ACT',
 'Australia/Adelaide',
 'Australia/Brisbane',
 'Australia/Broken_Hill',
 'Australia/Canberra',
 'Australia/Currie',
 'Australia/Darwin',
 'Australia/Eucla',
 'Australia/Hobart',
 'Australia/LHI',
 'Australia/Lindeman',
 'Australia/Lord_Howe',
 'Australia/Melbourne',
 'Australia/NSW',
 'Australia/North',
 'Australia/Perth',
 'Australia/Queensland',
 'Australia/South',
 'Australia/Sydney',
 'Australia/Tasmania',
 'Australia/Victoria',
 'Australia/West',
 'Australia/Yancowinna',
 'Brazil/Acre',
 'Brazil/DeNoronha',
 'Brazil/East',
 'Brazil/West',
 'CET',
 'CST6CDT',
 'Canada/Atlantic',
 'Canada/Central',
 'Canada/Eastern',
 'Canada/Mountain',
 'Canada/Newfoundland',
 'Canada/Pacific',
 'Canada/Saskatchewan',
 'Canada/Yukon',
 'Chile/Continental',
 'Chile/EasterIsland',
 'Cuba',
 'EET',
 'EST',
 'EST5EDT',
 'Egypt',
 'Eire',
 'Etc/GMT',
 'Etc/GMT+0',
 'Etc/GMT+1',
 'Etc/GMT+10',
 'Etc/GMT+11',
 'Etc/GMT+12',
 'Etc/GMT+2',
 'Etc/GMT+3',
 'Etc/GMT+4',
 'Etc/GMT+5',
 'Etc/GMT+6',
 'Etc/GMT+7',
 'Etc/GMT+8',
 'Etc/GMT+9',
 'Etc/GMT-0',
 'Etc/GMT-1',
 'Etc/GMT-10',
 'Etc/GMT-11',
 'Etc/GMT-12',
 'Etc/GMT-13',
 'Etc/GMT-14',
 'Etc/GMT-2',
 'Etc/GMT-3',
 'Etc/GMT-4',
 'Etc/GMT-5',
 'Etc/GMT-6',
 'Etc/GMT-7',
 'Etc/GMT-8',
 'Etc/GMT-9',
 'Etc/GMT0',
 'Etc/Greenwich',
 'Etc/UCT',
 'Etc/UTC',
 'Etc/Universal',
 'Etc/Zulu',
 'Europe/Amsterdam',
 'Europe/Andorra',
 'Europe/Astrakhan',
 'Europe/Athens',
 'Europe/Belfast',
 'Europe/Belgrade',
 'Europe/Berlin',
 'Europe/Bratislava',
 'Europe/Brussels',
 'Europe/Bucharest',
 'Europe/Budapest',
 'Europe/Busingen',
 'Europe/Chisinau',
 'Europe/Copenhagen',
 'Europe/Dublin',
 'Europe/Gibraltar',
 'Europe/Guernsey',
 'Europe/Helsinki',
 'Europe/Isle_of_Man',
 'Europe/Istanbul',
 'Europe/Jersey',
 'Europe/Kaliningrad',
 'Europe/Kiev',
 'Europe/Kirov',
 'Europe/Lisbon',
 'Europe/Ljubljana',
 'Europe/London',
 'Europe/Luxembourg',
 'Europe/Madrid',
 'Europe/Malta',
 'Europe/Mariehamn',
 'Europe/Minsk',
 'Europe/Monaco',
 'Europe/Moscow',
 'Europe/Nicosia',
 'Europe/Oslo',
 'Europe/Paris',
 'Europe/Podgorica',
 'Europe/Prague',
 'Europe/Riga',
 'Europe/Rome',
 'Europe/Samara',
 'Europe/San_Marino',
 'Europe/Sarajevo',
 'Europe/Saratov',
 'Europe/Simferopol',
 'Europe/Skopje',
 'Europe/Sofia',
 'Europe/Stockholm',
 'Europe/Tallinn',
 'Europe/Tirane',
 'Europe/Tiraspol',
 'Europe/Ulyanovsk',
 'Europe/Uzhgorod',
 'Europe/Vaduz',
 'Europe/Vatican',
 'Europe/Vienna',
 'Europe/Vilnius',
 'Europe/Volgograd',
 'Europe/Warsaw',
 'Europe/Zagreb',
 'Europe/Zaporozhye',
 'Europe/Zurich',
 'GB',
 'GB-Eire',
 'GMT',
 'GMT+0',
 'GMT-0',
 'GMT0',
 'Greenwich',
 'HST',
 'Hongkong',
 'Iceland',
 'Indian/Antananarivo',
 'Indian/Chagos',
 'Indian/Christmas',
 'Indian/Cocos',
 'Indian/Comoro',
 'Indian/Kerguelen',
 'Indian/Mahe',
 'Indian/Maldives',
 'Indian/Mauritius',
 'Indian/Mayotte',
 'Indian/Reunion',
 'Iran',
 'Israel',
 'Jamaica',
 'Japan',
 'Kwajalein',
 'Libya',
 'MET',
 'MST',
 'MST7MDT',
 'Mexico/BajaNorte',
 'Mexico/BajaSur',
 'Mexico/General',
 'NZ',
 'NZ-CHAT',
 'Navajo',
 'PRC',
 'PST8PDT',
 'Pacific/Apia',
 'Pacific/Auckland',
 'Pacific/Bougainville',
 'Pacific/Chatham',
 'Pacific/Chuuk',
 'Pacific/Easter',
 'Pacific/Efate',
 'Pacific/Enderbury',
 'Pacific/Fakaofo',
 'Pacific/Fiji',
 'Pacific/Funafuti',
 'Pacific/Galapagos',
 'Pacific/Gambier',
 'Pacific/Guadalcanal',
 'Pacific/Guam',
 'Pacific/Honolulu',
 'Pacific/Johnston',
 'Pacific/Kiritimati',
 'Pacific/Kosrae',
 'Pacific/Kwajalein',
 'Pacific/Majuro',
 'Pacific/Marquesas',
 'Pacific/Midway',
 'Pacific/Nauru',
 'Pacific/Niue',
 'Pacific/Norfolk',
 'Pacific/Noumea',
 'Pacific/Pago_Pago',
 'Pacific/Palau',
 'Pacific/Pitcairn',
 'Pacific/Pohnpei',
 'Pacific/Ponape',
 'Pacific/Port_Moresby',
 'Pacific/Rarotonga',
 'Pacific/Saipan',
 'Pacific/Samoa',
 'Pacific/Tahiti',
 'Pacific/Tarawa',
 'Pacific/Tongatapu',
 'Pacific/Truk',
 'Pacific/Wake',
 'Pacific/Wallis',
 'Pacific/Yap',
 'Poland',
 'Portugal',
 'ROC',
 'ROK',
 'Singapore',
 'Turkey',
 'UCT',
 'US/Alaska',
 'US/Aleutian',
 'US/Arizona',
 'US/Central',
 'US/East-Indiana',
 'US/Eastern',
 'US/Hawaii',
 'US/Indiana-Starke',
 'US/Michigan',
 'US/Mountain',
 'US/Pacific',
 'US/Samoa',
 'UTC',
 'Universal',
 'W-SU',
 'WET',
 'Zulu']

>>> len(pytz.all_timezones)
593

>>>
```

上面包含的所有的时区信息，现在有可能有的已经废弃不用了。

### 常用时区列表



```python
>>> print(pytz.common_timezones)
['Africa/Abidjan',
 'Africa/Accra',
 'Africa/Addis_Ababa',
 'Africa/Algiers',
 'Africa/Asmara',
 'Africa/Bamako',
 'Africa/Bangui',
 'Africa/Banjul',
 'Africa/Bissau',
 'Africa/Blantyre',
 'Africa/Brazzaville',
 'Africa/Bujumbura',
 'Africa/Cairo',
 'Africa/Casablanca',
 'Africa/Ceuta',
 'Africa/Conakry',
 'Africa/Dakar',
 'Africa/Dar_es_Salaam',
 'Africa/Djibouti',
 'Africa/Douala',
 'Africa/El_Aaiun',
 'Africa/Freetown',
 'Africa/Gaborone',
 'Africa/Harare',
 'Africa/Johannesburg',
 'Africa/Juba',
 'Africa/Kampala',
 'Africa/Khartoum',
 'Africa/Kigali',
 'Africa/Kinshasa',
 'Africa/Lagos',
 'Africa/Libreville',
 'Africa/Lome',
 'Africa/Luanda',
 'Africa/Lubumbashi',
 'Africa/Lusaka',
 'Africa/Malabo',
 'Africa/Maputo',
 'Africa/Maseru',
 'Africa/Mbabane',
 'Africa/Mogadishu',
 'Africa/Monrovia',
 'Africa/Nairobi',
 'Africa/Ndjamena',
 'Africa/Niamey',
 'Africa/Nouakchott',
 'Africa/Ouagadougou',
 'Africa/Porto-Novo',
 'Africa/Sao_Tome',
 'Africa/Tripoli',
 'Africa/Tunis',
 'Africa/Windhoek',
 'America/Adak',
 'America/Anchorage',
 'America/Anguilla',
 'America/Antigua',
 'America/Araguaina',
 'America/Argentina/Buenos_Aires',
 'America/Argentina/Catamarca',
 'America/Argentina/Cordoba',
 'America/Argentina/Jujuy',
 'America/Argentina/La_Rioja',
 'America/Argentina/Mendoza',
 'America/Argentina/Rio_Gallegos',
 'America/Argentina/Salta',
 'America/Argentina/San_Juan',
 'America/Argentina/San_Luis',
 'America/Argentina/Tucuman',
 'America/Argentina/Ushuaia',
 'America/Aruba',
 'America/Asuncion',
 'America/Atikokan',
 'America/Bahia',
 'America/Bahia_Banderas',
 'America/Barbados',
 'America/Belem',
 'America/Belize',
 'America/Blanc-Sablon',
 'America/Boa_Vista',
 'America/Bogota',
 'America/Boise',
 'America/Cambridge_Bay',
 'America/Campo_Grande',
 'America/Cancun',
 'America/Caracas',
 'America/Cayenne',
 'America/Cayman',
 'America/Chicago',
 'America/Chihuahua',
 'America/Costa_Rica',
 'America/Creston',
 'America/Cuiaba',
 'America/Curacao',
 'America/Danmarkshavn',
 'America/Dawson',
 'America/Dawson_Creek',
 'America/Denver',
 'America/Detroit',
 'America/Dominica',
 'America/Edmonton',
 'America/Eirunepe',
 'America/El_Salvador',
 'America/Fort_Nelson',
 'America/Fortaleza',
 'America/Glace_Bay',
 'America/Goose_Bay',
 'America/Grand_Turk',
 'America/Grenada',
 'America/Guadeloupe',
 'America/Guatemala',
 'America/Guayaquil',
 'America/Guyana',
 'America/Halifax',
 'America/Havana',
 'America/Hermosillo',
 'America/Indiana/Indianapolis',
 'America/Indiana/Knox',
 'America/Indiana/Marengo',
 'America/Indiana/Petersburg',
 'America/Indiana/Tell_City',
 'America/Indiana/Vevay',
 'America/Indiana/Vincennes',
 'America/Indiana/Winamac',
 'America/Inuvik',
 'America/Iqaluit',
 'America/Jamaica',
 'America/Juneau',
 'America/Kentucky/Louisville',
 'America/Kentucky/Monticello',
 'America/Kralendijk',
 'America/La_Paz',
 'America/Lima',
 'America/Los_Angeles',
 'America/Lower_Princes',
 'America/Maceio',
 'America/Managua',
 'America/Manaus',
 'America/Marigot',
 'America/Martinique',
 'America/Matamoros',
 'America/Mazatlan',
 'America/Menominee',
 'America/Merida',
 'America/Metlakatla',
 'America/Mexico_City',
 'America/Miquelon',
 'America/Moncton',
 'America/Monterrey',
 'America/Montevideo',
 'America/Montserrat',
 'America/Nassau',
 'America/New_York',
 'America/Nipigon',
 'America/Nome',
 'America/Noronha',
 'America/North_Dakota/Beulah',
 'America/North_Dakota/Center',
 'America/North_Dakota/New_Salem',
 'America/Nuuk',
 'America/Ojinaga',
 'America/Panama',
 'America/Pangnirtung',
 'America/Paramaribo',
 'America/Phoenix',
 'America/Port-au-Prince',
 'America/Port_of_Spain',
 'America/Porto_Velho',
 'America/Puerto_Rico',
 'America/Punta_Arenas',
 'America/Rainy_River',
 'America/Rankin_Inlet',
 'America/Recife',
 'America/Regina',
 'America/Resolute',
 'America/Rio_Branco',
 'America/Santarem',
 'America/Santiago',
 'America/Santo_Domingo',
 'America/Sao_Paulo',
 'America/Scoresbysund',
 'America/Sitka',
 'America/St_Barthelemy',
 'America/St_Johns',
 'America/St_Kitts',
 'America/St_Lucia',
 'America/St_Thomas',
 'America/St_Vincent',
 'America/Swift_Current',
 'America/Tegucigalpa',
 'America/Thule',
 'America/Thunder_Bay',
 'America/Tijuana',
 'America/Toronto',
 'America/Tortola',
 'America/Vancouver',
 'America/Whitehorse',
 'America/Winnipeg',
 'America/Yakutat',
 'America/Yellowknife',
 'Antarctica/Casey',
 'Antarctica/Davis',
 'Antarctica/DumontDUrville',
 'Antarctica/Macquarie',
 'Antarctica/Mawson',
 'Antarctica/McMurdo',
 'Antarctica/Palmer',
 'Antarctica/Rothera',
 'Antarctica/Syowa',
 'Antarctica/Troll',
 'Antarctica/Vostok',
 'Arctic/Longyearbyen',
 'Asia/Aden',
 'Asia/Almaty',
 'Asia/Amman',
 'Asia/Anadyr',
 'Asia/Aqtau',
 'Asia/Aqtobe',
 'Asia/Ashgabat',
 'Asia/Atyrau',
 'Asia/Baghdad',
 'Asia/Bahrain',
 'Asia/Baku',
 'Asia/Bangkok',
 'Asia/Barnaul',
 'Asia/Beirut',
 'Asia/Bishkek',
 'Asia/Brunei',
 'Asia/Chita',
 'Asia/Choibalsan',
 'Asia/Colombo',
 'Asia/Damascus',
 'Asia/Dhaka',
 'Asia/Dili',
 'Asia/Dubai',
 'Asia/Dushanbe',
 'Asia/Famagusta',
 'Asia/Gaza',
 'Asia/Hebron',
 'Asia/Ho_Chi_Minh',
 'Asia/Hong_Kong',
 'Asia/Hovd',
 'Asia/Irkutsk',
 'Asia/Jakarta',
 'Asia/Jayapura',
 'Asia/Jerusalem',
 'Asia/Kabul',
 'Asia/Kamchatka',
 'Asia/Karachi',
 'Asia/Kathmandu',
 'Asia/Khandyga',
 'Asia/Kolkata',
 'Asia/Krasnoyarsk',
 'Asia/Kuala_Lumpur',
 'Asia/Kuching',
 'Asia/Kuwait',
 'Asia/Macau',
 'Asia/Magadan',
 'Asia/Makassar',
 'Asia/Manila',
 'Asia/Muscat',
 'Asia/Nicosia',
 'Asia/Novokuznetsk',
 'Asia/Novosibirsk',
 'Asia/Omsk',
 'Asia/Oral',
 'Asia/Phnom_Penh',
 'Asia/Pontianak',
 'Asia/Pyongyang',
 'Asia/Qatar',
 'Asia/Qostanay',
 'Asia/Qyzylorda',
 'Asia/Riyadh',
 'Asia/Sakhalin',
 'Asia/Samarkand',
 'Asia/Seoul',
 'Asia/Shanghai',
 'Asia/Singapore',
 'Asia/Srednekolymsk',
 'Asia/Taipei',
 'Asia/Tashkent',
 'Asia/Tbilisi',
 'Asia/Tehran',
 'Asia/Thimphu',
 'Asia/Tokyo',
 'Asia/Tomsk',
 'Asia/Ulaanbaatar',
 'Asia/Urumqi',
 'Asia/Ust-Nera',
 'Asia/Vientiane',
 'Asia/Vladivostok',
 'Asia/Yakutsk',
 'Asia/Yangon',
 'Asia/Yekaterinburg',
 'Asia/Yerevan',
 'Atlantic/Azores',
 'Atlantic/Bermuda',
 'Atlantic/Canary',
 'Atlantic/Cape_Verde',
 'Atlantic/Faroe',
 'Atlantic/Madeira',
 'Atlantic/Reykjavik',
 'Atlantic/South_Georgia',
 'Atlantic/St_Helena',
 'Atlantic/Stanley',
 'Australia/Adelaide',
 'Australia/Brisbane',
 'Australia/Broken_Hill',
 'Australia/Currie',
 'Australia/Darwin',
 'Australia/Eucla',
 'Australia/Hobart',
 'Australia/Lindeman',
 'Australia/Lord_Howe',
 'Australia/Melbourne',
 'Australia/Perth',
 'Australia/Sydney',
 'Canada/Atlantic',
 'Canada/Central',
 'Canada/Eastern',
 'Canada/Mountain',
 'Canada/Newfoundland',
 'Canada/Pacific',
 'Europe/Amsterdam',
 'Europe/Andorra',
 'Europe/Astrakhan',
 'Europe/Athens',
 'Europe/Belgrade',
 'Europe/Berlin',
 'Europe/Bratislava',
 'Europe/Brussels',
 'Europe/Bucharest',
 'Europe/Budapest',
 'Europe/Busingen',
 'Europe/Chisinau',
 'Europe/Copenhagen',
 'Europe/Dublin',
 'Europe/Gibraltar',
 'Europe/Guernsey',
 'Europe/Helsinki',
 'Europe/Isle_of_Man',
 'Europe/Istanbul',
 'Europe/Jersey',
 'Europe/Kaliningrad',
 'Europe/Kiev',
 'Europe/Kirov',
 'Europe/Lisbon',
 'Europe/Ljubljana',
 'Europe/London',
 'Europe/Luxembourg',
 'Europe/Madrid',
 'Europe/Malta',
 'Europe/Mariehamn',
 'Europe/Minsk',
 'Europe/Monaco',
 'Europe/Moscow',
 'Europe/Oslo',
 'Europe/Paris',
 'Europe/Podgorica',
 'Europe/Prague',
 'Europe/Riga',
 'Europe/Rome',
 'Europe/Samara',
 'Europe/San_Marino',
 'Europe/Sarajevo',
 'Europe/Saratov',
 'Europe/Simferopol',
 'Europe/Skopje',
 'Europe/Sofia',
 'Europe/Stockholm',
 'Europe/Tallinn',
 'Europe/Tirane',
 'Europe/Ulyanovsk',
 'Europe/Uzhgorod',
 'Europe/Vaduz',
 'Europe/Vatican',
 'Europe/Vienna',
 'Europe/Vilnius',
 'Europe/Volgograd',
 'Europe/Warsaw',
 'Europe/Zagreb',
 'Europe/Zaporozhye',
 'Europe/Zurich',
 'GMT',
 'Indian/Antananarivo',
 'Indian/Chagos',
 'Indian/Christmas',
 'Indian/Cocos',
 'Indian/Comoro',
 'Indian/Kerguelen',
 'Indian/Mahe',
 'Indian/Maldives',
 'Indian/Mauritius',
 'Indian/Mayotte',
 'Indian/Reunion',
 'Pacific/Apia',
 'Pacific/Auckland',
 'Pacific/Bougainville',
 'Pacific/Chatham',
 'Pacific/Chuuk',
 'Pacific/Easter',
 'Pacific/Efate',
 'Pacific/Enderbury',
 'Pacific/Fakaofo',
 'Pacific/Fiji',
 'Pacific/Funafuti',
 'Pacific/Galapagos',
 'Pacific/Gambier',
 'Pacific/Guadalcanal',
 'Pacific/Guam',
 'Pacific/Honolulu',
 'Pacific/Kiritimati',
 'Pacific/Kosrae',
 'Pacific/Kwajalein',
 'Pacific/Majuro',
 'Pacific/Marquesas',
 'Pacific/Midway',
 'Pacific/Nauru',
 'Pacific/Niue',
 'Pacific/Norfolk',
 'Pacific/Noumea',
 'Pacific/Pago_Pago',
 'Pacific/Palau',
 'Pacific/Pitcairn',
 'Pacific/Pohnpei',
 'Pacific/Port_Moresby',
 'Pacific/Rarotonga',
 'Pacific/Saipan',
 'Pacific/Tahiti',
 'Pacific/Tarawa',
 'Pacific/Tongatapu',
 'Pacific/Wake',
 'Pacific/Wallis',
 'US/Alaska',
 'US/Arizona',
 'US/Central',
 'US/Eastern',
 'US/Hawaii',
 'US/Mountain',
 'US/Pacific',
 'UTC']

>>> len(pytz.common_timezones)
440

>>>

>>> from pytz import all_timezones, common_timezones

>>> 'Asia/Shanghai' in all_timezones
True

>>> 'Asia/Shanghai' in common_timezones
True
```

常用时区列表比所有的时区列表长度小100多。

### 时区集合

也可以使用`all_timezones_set`和`common_timezones_set`时区集合。

```python
>>> from pytz import all_timezones_set, common_timezones_set

>>> 'US/Eastern' in all_timezones_set
True

>>> 'US/Eastern' in common_timezones_set
True

>>> 'Australia/Victoria' in common_timezones_set
False

>>> 'Asia/Shanghai' in common_timezones_set
True

>>> 'Asia/Shanghai' in all_timezones_set
True

>>> type(all_timezones_set)
pytz.lazy.LazySet.__new__.<locals>.LazySet

>>> type(common_timezones_set)
pytz.lazy.LazySet.__new__.<locals>.LazySet
```

### 国家时区country_timezones()

你也可以使用国家时区功能。您还可以使用`country_timezones()`函数检索特定国家/地区使用的时区列表。 它要求一个ISO-3166两个字母的国家/地区代码。



#### ISO-3166 Country Codes 

可参考[https://docs.oracle.com/cd/E13214_01/wli/docs92/xref/xqisocodes.html](https://docs.oracle.com/cd/E13214_01/wli/docs92/xref/xqisocodes.html)，我复制了一份如下表所示：

| Country                                      | ISO-3166 Country Code |
| -------------------------------------------- | --------------------- |
| AFGHANISTAN                                  | AF                    |
| ALBANIA                                      | AL                    |
| ALGERIA                                      | DZ                    |
| AMERICAN SAMOA                               | AS                    |
| ANDORRA                                      | AD                    |
| ANGOLA                                       | AO                    |
| ANTARCTICA                                   | AQ                    |
| ANTIGUA AND BARBUDA                          | AG                    |
| ARGENTINA                                    | AR                    |
| ARMENIA                                      | AM                    |
| ARUBA                                        | AW                    |
| AUSTRALIA                                    | AU                    |
| AUSTRIA                                      | AT                    |
| AZERBAIJAN                                   | AZ                    |
| BAHAMAS                                      | BS                    |
| BAHRAIN                                      | BH                    |
| BANGLADESH                                   | BD                    |
| BARBADOS                                     | BB                    |
| BELARUS                                      | BY                    |
| BELGIUM                                      | BE                    |
| BELIZE                                       | BZ                    |
| BENIN                                        | BJ                    |
| BERMUDA                                      | BM                    |
| BHUTAN                                       | BT                    |
| BOLIVIA                                      | BO                    |
| BOSNIA AND HERZEGOVINA                       | BA                    |
| BOTSWANA                                     | BW                    |
| BOUVET ISLAND                                | BV                    |
| BRAZIL                                       | BR                    |
| BRITISH INDIAN OCEAN TERRITORY               | IO                    |
| BRUNEI DARUSSALAM                            | BN                    |
| BULGARIA                                     | BG                    |
| BURKINA FASO                                 | BF                    |
| BURUNDI                                      | BI                    |
| CAMBODIA                                     | KH                    |
| CAMEROON                                     | CM                    |
| CANADA                                       | CA                    |
| CAPE VERDE                                   | CV                    |
| CAYMAN ISLANDS                               | KY                    |
| CENTRAL AFRICAN REPUBLIC                     | CF                    |
| CHAD                                         | TD                    |
| CHILE                                        | CL                    |
| CHINA                                        | CN                    |
| CHRISTMAS ISLAND                             | CX                    |
| COCOS (KEELING) ISLANDS                      | CC                    |
| COLOMBIA                                     | CO                    |
| COMOROS                                      | KM                    |
| CONGO                                        | CG                    |
| CONGO, THE DEMOCRATIC REPUBLIC OF THE        | CD                    |
| COOK ISLANDS                                 | CK                    |
| COSTA RICA                                   | CR                    |
| CÔTE D'IVOIRE                                | CI                    |
| CROATIA                                      | HR                    |
| CUBA                                         | CU                    |
| CYPRUS                                       | CY                    |
| CZECH REPUBLIC                               | CZ                    |
| DENMARK                                      | DK                    |
| DJIBOUTI                                     | DJ                    |
| DOMINICA                                     | DM                    |
| DOMINICAN REPUBLIC                           | DO                    |
| ECUADOR                                      | EC                    |
| EGYPT                                        | EG                    |
| EL SALVADOR                                  | SV                    |
| EQUATORIAL GUINEA                            | GQ                    |
| ERITREA                                      | ER                    |
| ESTONIA                                      | EE                    |
| ETHIOPIA                                     | ET                    |
| FALKLAND ISLANDS (MALVINAS)                  | FK                    |
| FAROE ISLANDS                                | FO                    |
| FIJI                                         | FJ                    |
| FINLAND                                      | FI                    |
| FRANCE                                       | FR                    |
| FRENCH GUIANA                                | GF                    |
| FRENCH POLYNESIA                             | PF                    |
| FRENCH SOUTHERN TERRITORIES                  | TF                    |
| GABON                                        | GA                    |
| GAMBIA                                       | GM                    |
| GEORGIA                                      | GE                    |
| GERMANY                                      | DE                    |
| GHANA                                        | GH                    |
| GIBRALTAR                                    | GI                    |
| GREECE                                       | GR                    |
| GREENLAND                                    | GL                    |
| GRENADA                                      | GD                    |
| GUADELOUPE                                   | GP                    |
| GUAM                                         | GU                    |
| GUATEMALA                                    | GT                    |
| GUINEA                                       | GN                    |
| GUINEA-BISSAU                                | GW                    |
| GUYANA                                       | GY                    |
| HAITI                                        | HT                    |
| HEARD ISLAND AND MCDONALD ISLANDS            | HM                    |
| HONDURAS                                     | HN                    |
| HONG KONG                                    | HK                    |
| HUNGARY                                      | HU                    |
| ICELAND                                      | IS                    |
| INDIA                                        | IN                    |
| INDONESIA                                    | ID                    |
| IRAN, ISLAMIC REPUBLIC OF                    | IR                    |
| IRAQ                                         | IQ                    |
| IRELAND                                      | IE                    |
| ISRAEL                                       | IL                    |
| ITALY                                        | IT                    |
| JAMAICA                                      | JM                    |
| JAPAN                                        | JP                    |
| JORDAN                                       | JO                    |
| KAZAKHSTAN                                   | KZ                    |
| KENYA                                        | KE                    |
| KIRIBATI                                     | KI                    |
| KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF       | KP                    |
| KOREA, REPUBLIC OF                           | KR                    |
| KUWAIT                                       | KW                    |
| KYRGYZSTAN                                   | KG                    |
| LAO PEOPLE'S DEMOCRATIC REPUBLIC             | LA                    |
| LATVIA                                       | LV                    |
| LEBANON                                      | LB                    |
| LESOTHO                                      | LS                    |
| LIBERIA                                      | LR                    |
| LIBYAN ARAB JAMAHIRIYA                       | LY                    |
| LIECHTENSTEIN                                | LI                    |
| LITHUANIA                                    | LT                    |
| LUXEMBOURG                                   | LU                    |
| MACAO                                        | MO                    |
| MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF   | MK                    |
| MADAGASCAR                                   | MG                    |
| MALAWI                                       | MW                    |
| MALAYSIA                                     | MY                    |
| MALDIVES                                     | MV                    |
| MALI                                         | ML                    |
| MALTA                                        | MT                    |
| MARSHALL ISLANDS                             | MH                    |
| MARTINIQUE                                   | MQ                    |
| MAURITANIA                                   | MR                    |
| MAURITIUS                                    | MU                    |
| MAYOTTE                                      | YT                    |
| MEXICO                                       | MX                    |
| MICRONESIA, FEDERATED STATES OF              | FM                    |
| MOLDOVA, REPUBLIC OF                         | MD                    |
| MONACO                                       | MD                    |
| MONGOLIA                                     | MN                    |
| MONTSERRAT                                   | MS                    |
| MOROCCO                                      | MA                    |
| MOZAMBIQUE                                   | MZ                    |
| MYANMAR                                      | MM                    |
| NAMIBIA                                      | NA                    |
| NAURU                                        | NR                    |
| NEPAL                                        | NP                    |
| NETHERLANDS                                  | NL                    |
| NETHERLANDS ANTILLES                         | AN                    |
| NEW CALEDONIA                                | NC                    |
| NEW ZEALAND                                  | NZ                    |
| NICARAGUA                                    | NI                    |
| NIGER                                        | NE                    |
| NIGERIA                                      | NG                    |
| NIUE                                         | NU                    |
| NORFOLK ISLAND                               | NF                    |
| NORTHERN MARIANA ISLANDS                     | MP                    |
| NORWAY                                       | NO                    |
| OMAN                                         | OM                    |
| PAKISTAN                                     | PK                    |
| PALAU                                        | PW                    |
| PALESTINIAN TERRITORY, OCCUPIED              | PS                    |
| PANAMA                                       | PA                    |
| PAPUA NEW GUINEA                             | PG                    |
| PARAGUAY                                     | PY                    |
| PERU                                         | PE                    |
| PHILIPPINES                                  | PH                    |
| PITCAIRN                                     | PN                    |
| POLAND                                       | PL                    |
| PUERTO RICO                                  | PR                    |
| QATAR                                        | QA                    |
| RÉUNION                                      | RE                    |
| ROMANIA                                      | RO                    |
| RUSSIAN FEDERATION                           | RU                    |
| RWANDA                                       | RW                    |
| SAINT HELENA                                 | SH                    |
| SAINT KITTS AND NEVIS                        | KN                    |
| SAINT LUCIA                                  | LC                    |
| SAINT PIERRE AND MIQUELON                    | PM                    |
| SAINT VINCENT AND THE GRENADINES             | VC                    |
| SAMOA                                        | WS                    |
| SAN MARINO                                   | SM                    |
| SAO TOME AND PRINCIPE                        | ST                    |
| SAUDI ARABIA                                 | SA                    |
| SENEGAL                                      | SN                    |
| SERBIA AND MONTENEGRO                        | CS                    |
| SEYCHELLES                                   | SC                    |
| SIERRA LEONE                                 | SL                    |
| SINGAPORE                                    | SG                    |
| SLOVAKIA                                     | SK                    |
| SLOVENIA                                     | SI                    |
| SOLOMON ISLANDS                              | SB                    |
| SOMALIA                                      | SO                    |
| SOUTH AFRICA                                 | ZA                    |
| SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS | GS                    |
| SPAIN                                        | ES                    |
| SRI LANKA                                    | LK                    |
| SUDAN                                        | SD                    |
| SURINAME                                     | SR                    |
| SVALBARD AND JAN MAYEN                       | SJ                    |
| SWAZILAND                                    | SZ                    |
| SWEDEN                                       | SE                    |
| SWITZERLAND                                  | CH                    |
| SYRIAN ARAB REPUBLIC                         | SY                    |
| TAIWAN, PROVINCE OF CHINA                    | TW                    |
| TAJIKISTAN                                   | TJ                    |
| TANZANIA, UNITED REPUBLIC OF                 | TZ                    |
| THAILAND                                     | TH                    |
| TIMOR-LESTE                                  | TL                    |
| TOGO                                         | TG                    |
| TOKELAU                                      | TK                    |
| TONGA                                        | TO                    |
| TRINIDAD AND TOBAGO                          | TT                    |
| TUNISIA                                      | TN                    |
| TURKEY                                       | TR                    |
| TURKMENISTAN                                 | TM                    |
| TURKS AND CAICOS ISLANDS                     | TC                    |
| TUVALU                                       | TV                    |
| UGANDA                                       | UG                    |
| UKRAINE                                      | UA                    |
| UNITED ARAB EMIRATES                         | AE                    |
| UNITED KINGDOM                               | GB                    |
| UNITED STATES                                | US                    |
| UNITED STATES MINOR OUTLYING ISLANDS         | UM                    |
| URUGUAY                                      | UY                    |
| UZBEKISTAN                                   | UZ                    |
| VANUATU                                      | VU                    |
| VENEZUELA                                    | VE                    |
| VIET NAM                                     | VN                    |
| VIRGIN ISLANDS, BRITISH                      | VG                    |
| VIRGIN ISLANDS, U.S.                         | VI                    |
| WALLIS AND FUTUNA                            | WF                    |
| WESTERN SAHARA                               | EH                    |
| YEMEN                                        | YE                    |
| ZAMBIA                                       | ZM                    |
| ZIMBABWE                                     | ZW                    |

 使用`country_timezones`函数：

```python
>>> from pytz import country_timezones

# 阿富汗伊斯兰共和国🇦🇫，亚洲/喀布尔
>>> country_timezones['af']
['Asia/Kabul']

>>> country_timezones['AF']
['Asia/Kabul']

# 阿尔巴尼亚共和国🇦🇱ALBANIA, 欧洲/地拉那
>>> country_timezones['AL']
['Europe/Tirane']

# CN中国🇨🇳对应的时区，亚洲/上海，亚洲/乌鲁木齐
>>> country_timezones['CN']
['Asia/Shanghai', 'Asia/Urumqi']

# 斐济🇫🇯对应的时区
>>> country_timezones['FJ']
['Pacific/Fiji']

# 美国🇺🇸的时区
>>> country_timezones['US']
['America/New_York',
 'America/Detroit',
 'America/Kentucky/Louisville',
 'America/Kentucky/Monticello',
 'America/Indiana/Indianapolis',
 'America/Indiana/Vincennes',
 'America/Indiana/Winamac',
 'America/Indiana/Marengo',
 'America/Indiana/Petersburg',
 'America/Indiana/Vevay',
 'America/Chicago',
 'America/Indiana/Tell_City',
 'America/Indiana/Knox',
 'America/Menominee',
 'America/North_Dakota/Center',
 'America/North_Dakota/New_Salem',
 'America/North_Dakota/Beulah',
 'America/Denver',
 'America/Boise',
 'America/Phoenix',
 'America/Los_Angeles',
 'America/Anchorage',
 'America/Juneau',
 'America/Sitka',
 'America/Metlakatla',
 'America/Yakutat',
 'America/Nome',
 'America/Adak',
 'Pacific/Honolulu']

# 日本🇯🇵对应的时区, 亚洲/东京
>>> country_timezones['JP']
['Asia/Tokyo']

# 印度🇮🇳对应的时区，亚洲/加尔各答
>>> country_timezones['IN']
['Asia/Kolkata']
```



### 国家名称country_names

```python
>>> from pytz import country_names

>>> country_names
<pytz._CountryNameDict at 0x10bb77390>

>>> dict(country_names)
{'AD': 'Andorra',
 'AE': 'United Arab Emirates',
 'AF': 'Afghanistan',
 'AG': 'Antigua & Barbuda',
 'AI': 'Anguilla',
 'AL': 'Albania',
 'AM': 'Armenia',
 'AO': 'Angola',
 'AQ': 'Antarctica',
 'AR': 'Argentina',
 'AS': 'Samoa (American)',
 'AT': 'Austria',
 'AU': 'Australia',
 'AW': 'Aruba',
 'AX': 'Åland Islands',
 'AZ': 'Azerbaijan',
 'BA': 'Bosnia & Herzegovina',
 'BB': 'Barbados',
 'BD': 'Bangladesh',
 'BE': 'Belgium',
 'BF': 'Burkina Faso',
 'BG': 'Bulgaria',
 'BH': 'Bahrain',
 'BI': 'Burundi',
 'BJ': 'Benin',
 'BL': 'St Barthelemy',
 'BM': 'Bermuda',
 'BN': 'Brunei',
 'BO': 'Bolivia',
 'BQ': 'Caribbean NL',
 'BR': 'Brazil',
 'BS': 'Bahamas',
 'BT': 'Bhutan',
 'BV': 'Bouvet Island',
 'BW': 'Botswana',
 'BY': 'Belarus',
 'BZ': 'Belize',
 'CA': 'Canada',
 'CC': 'Cocos (Keeling) Islands',
 'CD': 'Congo (Dem. Rep.)',
 'CF': 'Central African Rep.',
 'CG': 'Congo (Rep.)',
 'CH': 'Switzerland',
 'CI': "Côte d'Ivoire",
 'CK': 'Cook Islands',
 'CL': 'Chile',
 'CM': 'Cameroon',
 'CN': 'China',
 'CO': 'Colombia',
 'CR': 'Costa Rica',
 'CU': 'Cuba',
 'CV': 'Cape Verde',
 'CW': 'Curaçao',
 'CX': 'Christmas Island',
 'CY': 'Cyprus',
 'CZ': 'Czech Republic',
 'DE': 'Germany',
 'DJ': 'Djibouti',
 'DK': 'Denmark',
 'DM': 'Dominica',
 'DO': 'Dominican Republic',
 'DZ': 'Algeria',
 'EC': 'Ecuador',
 'EE': 'Estonia',
 'EG': 'Egypt',
 'EH': 'Western Sahara',
 'ER': 'Eritrea',
 'ES': 'Spain',
 'ET': 'Ethiopia',
 'FI': 'Finland',
 'FJ': 'Fiji',
 'FK': 'Falkland Islands',
 'FM': 'Micronesia',
 'FO': 'Faroe Islands',
 'FR': 'France',
 'GA': 'Gabon',
 'GB': 'Britain (UK)',
 'GD': 'Grenada',
 'GE': 'Georgia',
 'GF': 'French Guiana',
 'GG': 'Guernsey',
 'GH': 'Ghana',
 'GI': 'Gibraltar',
 'GL': 'Greenland',
 'GM': 'Gambia',
 'GN': 'Guinea',
 'GP': 'Guadeloupe',
 'GQ': 'Equatorial Guinea',
 'GR': 'Greece',
 'GS': 'South Georgia & the South Sandwich Islands',
 'GT': 'Guatemala',
 'GU': 'Guam',
 'GW': 'Guinea-Bissau',
 'GY': 'Guyana',
 'HK': 'Hong Kong',
 'HM': 'Heard Island & McDonald Islands',
 'HN': 'Honduras',
 'HR': 'Croatia',
 'HT': 'Haiti',
 'HU': 'Hungary',
 'ID': 'Indonesia',
 'IE': 'Ireland',
 'IL': 'Israel',
 'IM': 'Isle of Man',
 'IN': 'India',
 'IO': 'British Indian Ocean Territory',
 'IQ': 'Iraq',
 'IR': 'Iran',
 'IS': 'Iceland',
 'IT': 'Italy',
 'JE': 'Jersey',
 'JM': 'Jamaica',
 'JO': 'Jordan',
 'JP': 'Japan',
 'KE': 'Kenya',
 'KG': 'Kyrgyzstan',
 'KH': 'Cambodia',
 'KI': 'Kiribati',
 'KM': 'Comoros',
 'KN': 'St Kitts & Nevis',
 'KP': 'Korea (North)',
 'KR': 'Korea (South)',
 'KW': 'Kuwait',
 'KY': 'Cayman Islands',
 'KZ': 'Kazakhstan',
 'LA': 'Laos',
 'LB': 'Lebanon',
 'LC': 'St Lucia',
 'LI': 'Liechtenstein',
 'LK': 'Sri Lanka',
 'LR': 'Liberia',
 'LS': 'Lesotho',
 'LT': 'Lithuania',
 'LU': 'Luxembourg',
 'LV': 'Latvia',
 'LY': 'Libya',
 'MA': 'Morocco',
 'MC': 'Monaco',
 'MD': 'Moldova',
 'ME': 'Montenegro',
 'MF': 'St Martin (French)',
 'MG': 'Madagascar',
 'MH': 'Marshall Islands',
 'MK': 'North Macedonia',
 'ML': 'Mali',
 'MM': 'Myanmar (Burma)',
 'MN': 'Mongolia',
 'MO': 'Macau',
 'MP': 'Northern Mariana Islands',
 'MQ': 'Martinique',
 'MR': 'Mauritania',
 'MS': 'Montserrat',
 'MT': 'Malta',
 'MU': 'Mauritius',
 'MV': 'Maldives',
 'MW': 'Malawi',
 'MX': 'Mexico',
 'MY': 'Malaysia',
 'MZ': 'Mozambique',
 'NA': 'Namibia',
 'NC': 'New Caledonia',
 'NE': 'Niger',
 'NF': 'Norfolk Island',
 'NG': 'Nigeria',
 'NI': 'Nicaragua',
 'NL': 'Netherlands',
 'NO': 'Norway',
 'NP': 'Nepal',
 'NR': 'Nauru',
 'NU': 'Niue',
 'NZ': 'New Zealand',
 'OM': 'Oman',
 'PA': 'Panama',
 'PE': 'Peru',
 'PF': 'French Polynesia',
 'PG': 'Papua New Guinea',
 'PH': 'Philippines',
 'PK': 'Pakistan',
 'PL': 'Poland',
 'PM': 'St Pierre & Miquelon',
 'PN': 'Pitcairn',
 'PR': 'Puerto Rico',
 'PS': 'Palestine',
 'PT': 'Portugal',
 'PW': 'Palau',
 'PY': 'Paraguay',
 'QA': 'Qatar',
 'RE': 'Réunion',
 'RO': 'Romania',
 'RS': 'Serbia',
 'RU': 'Russia',
 'RW': 'Rwanda',
 'SA': 'Saudi Arabia',
 'SB': 'Solomon Islands',
 'SC': 'Seychelles',
 'SD': 'Sudan',
 'SE': 'Sweden',
 'SG': 'Singapore',
 'SH': 'St Helena',
 'SI': 'Slovenia',
 'SJ': 'Svalbard & Jan Mayen',
 'SK': 'Slovakia',
 'SL': 'Sierra Leone',
 'SM': 'San Marino',
 'SN': 'Senegal',
 'SO': 'Somalia',
 'SR': 'Suriname',
 'SS': 'South Sudan',
 'ST': 'Sao Tome & Principe',
 'SV': 'El Salvador',
 'SX': 'St Maarten (Dutch)',
 'SY': 'Syria',
 'SZ': 'Eswatini (Swaziland)',
 'TC': 'Turks & Caicos Is',
 'TD': 'Chad',
 'TF': 'French Southern & Antarctic Lands',
 'TG': 'Togo',
 'TH': 'Thailand',
 'TJ': 'Tajikistan',
 'TK': 'Tokelau',
 'TL': 'East Timor',
 'TM': 'Turkmenistan',
 'TN': 'Tunisia',
 'TO': 'Tonga',
 'TR': 'Turkey',
 'TT': 'Trinidad & Tobago',
 'TV': 'Tuvalu',
 'TW': 'Taiwan',
 'TZ': 'Tanzania',
 'UA': 'Ukraine',
 'UG': 'Uganda',
 'UM': 'US minor outlying islands',
 'US': 'United States',
 'UY': 'Uruguay',
 'UZ': 'Uzbekistan',
 'VA': 'Vatican City',
 'VC': 'St Vincent',
 'VE': 'Venezuela',
 'VG': 'Virgin Islands (UK)',
 'VI': 'Virgin Islands (US)',
 'VN': 'Vietnam',
 'VU': 'Vanuatu',
 'WF': 'Wallis & Futuna',
 'WS': 'Samoa (western)',
 'YE': 'Yemen',
 'YT': 'Mayotte',
 'ZA': 'South Africa',
 'ZM': 'Zambia',
 'ZW': 'Zimbabwe'}

>>>

# 阿富汗伊斯兰共和国，不区分大小写
>>> country_names['af']
'Afghanistan'

# 阿富汗伊斯兰共和国
>>> country_names['AF']
'Afghanistan'

# 阿尔巴尼亚共和国
>>> country_names['AL']
'Albania'

# 中国
>>> country_names['CN']
'China'

# 斐济
>>> country_names['FJ']
'Fiji'

# 美国
>>> country_names['US']
'United States'

# 日本
>>> country_names['JP']
'Japan'

# 印度
>>> country_names['IN']
'India'
```





参考：

- [https://pypi.org/project/pytz/](https://pypi.org/project/pytz/)

- [https://pythonhosted.org/pytz/](https://pythonhosted.org/pytz/)
- [https://github.com/stub42/pytz](https://github.com/stub42/pytz)




