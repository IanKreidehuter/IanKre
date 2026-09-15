// Dataset Kanji JLPT N5 (Bahasa Indonesia)
// Struktur dibuat modular agar set N4/N3/N2/N1 dapat ditambahkan nanti.
const KANJI_DATA_N5 = [
  {
    "kanji": "一",
    "level": "N5",
    "meanings": [
      "satu"
    ],
    "onyomi": [
      "イチ",
      "イツ"
    ],
    "kunyomi": [
      "ひと",
      "ひとつ"
    ],
    "examples": [
      {
        "word": "一つ",
        "reading": "ひとつ",
        "meaning": "satu (buah)"
      },
      {
        "word": "一月",
        "reading": "いちがつ",
        "meaning": "Januari"
      }
    ],
    "day": 1
  },
  {
    "kanji": "二",
    "level": "N5",
    "meanings": [
      "dua"
    ],
    "onyomi": [
      "ニ"
    ],
    "kunyomi": [
      "ふた",
      "ふたつ"
    ],
    "examples": [
      {
        "word": "二つ",
        "reading": "ふたつ",
        "meaning": "dua (buah)"
      },
      {
        "word": "二月",
        "reading": "にがつ",
        "meaning": "Februari"
      }
    ],
    "day": 1
  },
  {
    "kanji": "三",
    "level": "N5",
    "meanings": [
      "tiga"
    ],
    "onyomi": [
      "サン"
    ],
    "kunyomi": [
      "み",
      "みつ",
      "みっつ"
    ],
    "examples": [
      {
        "word": "三つ",
        "reading": "みっつ",
        "meaning": "tiga (buah)"
      },
      {
        "word": "三月",
        "reading": "さんがつ",
        "meaning": "Maret"
      }
    ],
    "day": 1
  },
  {
    "kanji": "四",
    "level": "N5",
    "meanings": [
      "empat"
    ],
    "onyomi": [
      "シ"
    ],
    "kunyomi": [
      "よ",
      "よつ",
      "よっつ",
      "よん"
    ],
    "examples": [
      {
        "word": "四つ",
        "reading": "よっつ",
        "meaning": "empat (buah)"
      },
      {
        "word": "四月",
        "reading": "しがつ",
        "meaning": "April"
      }
    ],
    "day": 1
  },
  {
    "kanji": "五",
    "level": "N5",
    "meanings": [
      "lima"
    ],
    "onyomi": [
      "ゴ"
    ],
    "kunyomi": [
      "いつ",
      "いつつ"
    ],
    "examples": [
      {
        "word": "五つ",
        "reading": "いつつ",
        "meaning": "lima (buah)"
      },
      {
        "word": "五月",
        "reading": "ごがつ",
        "meaning": "Mei"
      }
    ],
    "day": 1
  },
  {
    "kanji": "六",
    "level": "N5",
    "meanings": [
      "enam"
    ],
    "onyomi": [
      "ロク"
    ],
    "kunyomi": [
      "む",
      "むつ",
      "むっつ"
    ],
    "examples": [
      {
        "word": "六つ",
        "reading": "むっつ",
        "meaning": "enam (buah)"
      },
      {
        "word": "六月",
        "reading": "ろくがつ",
        "meaning": "Juni"
      }
    ],
    "day": 1
  },
  {
    "kanji": "七",
    "level": "N5",
    "meanings": [
      "tujuh"
    ],
    "onyomi": [
      "シチ"
    ],
    "kunyomi": [
      "なな",
      "ななつ"
    ],
    "examples": [
      {
        "word": "七つ",
        "reading": "ななつ",
        "meaning": "tujuh (buah)"
      },
      {
        "word": "七月",
        "reading": "しちがつ",
        "meaning": "Juli"
      }
    ],
    "day": 1
  },
  {
    "kanji": "八",
    "level": "N5",
    "meanings": [
      "delapan"
    ],
    "onyomi": [
      "ハチ"
    ],
    "kunyomi": [
      "や",
      "やつ",
      "やっつ"
    ],
    "examples": [
      {
        "word": "八つ",
        "reading": "やっつ",
        "meaning": "delapan (buah)"
      },
      {
        "word": "八月",
        "reading": "はちがつ",
        "meaning": "Agustus"
      }
    ],
    "day": 1
  },
  {
    "kanji": "九",
    "level": "N5",
    "meanings": [
      "sembilan"
    ],
    "onyomi": [
      "キュウ",
      "ク"
    ],
    "kunyomi": [
      "ここの",
      "ここのつ"
    ],
    "examples": [
      {
        "word": "九つ",
        "reading": "ここのつ",
        "meaning": "sembilan (buah)"
      },
      {
        "word": "九月",
        "reading": "くがつ",
        "meaning": "September"
      }
    ],
    "day": 1
  },
  {
    "kanji": "十",
    "level": "N5",
    "meanings": [
      "sepuluh"
    ],
    "onyomi": [
      "ジュウ"
    ],
    "kunyomi": [
      "とお",
      "と"
    ],
    "examples": [
      {
        "word": "十",
        "reading": "じゅう",
        "meaning": "sepuluh"
      },
      {
        "word": "十月",
        "reading": "じゅうがつ",
        "meaning": "Oktober"
      }
    ],
    "day": 1
  },
  {
    "kanji": "百",
    "level": "N5",
    "meanings": [
      "ratus"
    ],
    "onyomi": [
      "ヒャク"
    ],
    "kunyomi": [],
    "examples": [
      {
        "word": "百円",
        "reading": "ひゃくえん",
        "meaning": "100 yen"
      },
      {
        "word": "百",
        "reading": "ひゃく",
        "meaning": "seratus"
      }
    ],
    "day": 1
  },
  {
    "kanji": "千",
    "level": "N5",
    "meanings": [
      "ribu"
    ],
    "onyomi": [
      "セン"
    ],
    "kunyomi": [
      "ち"
    ],
    "examples": [
      {
        "word": "千円",
        "reading": "せんえん",
        "meaning": "1.000 yen"
      },
      {
        "word": "千",
        "reading": "せん",
        "meaning": "seribu"
      }
    ],
    "day": 1
  },
  {
    "kanji": "万",
    "level": "N5",
    "meanings": [
      "puluhan ribu",
      "sangat banyak"
    ],
    "onyomi": [
      "マン",
      "バン"
    ],
    "kunyomi": [],
    "examples": [
      {
        "word": "一万円",
        "reading": "いちまんえん",
        "meaning": "10.000 yen"
      },
      {
        "word": "一万",
        "reading": "いちまん",
        "meaning": "sepuluh ribu"
      }
    ],
    "day": 1
  },
  {
    "kanji": "円",
    "level": "N5",
    "meanings": [
      "yen",
      "lingkaran",
      "bulat"
    ],
    "onyomi": [
      "エン"
    ],
    "kunyomi": [
      "まるい"
    ],
    "examples": [
      {
        "word": "百円",
        "reading": "ひゃくえん",
        "meaning": "100 yen"
      },
      {
        "word": "円",
        "reading": "えん",
        "meaning": "yen"
      }
    ],
    "day": 1
  },
  {
    "kanji": "日",
    "level": "N5",
    "meanings": [
      "hari",
      "matahari"
    ],
    "onyomi": [
      "ニチ",
      "ジツ"
    ],
    "kunyomi": [
      "ひ",
      "か"
    ],
    "examples": [
      {
        "word": "日本",
        "reading": "にほん",
        "meaning": "Jepang"
      },
      {
        "word": "日曜日",
        "reading": "にちようび",
        "meaning": "hari Minggu"
      },
      {
        "word": "日",
        "reading": "ひ",
        "meaning": "hari / matahari"
      }
    ],
    "day": 2
  },
  {
    "kanji": "月",
    "level": "N5",
    "meanings": [
      "bulan (waktu)",
      "bulan (langit)"
    ],
    "onyomi": [
      "ゲツ",
      "ガツ"
    ],
    "kunyomi": [
      "つき"
    ],
    "examples": [
      {
        "word": "月曜日",
        "reading": "げつようび",
        "meaning": "hari Senin"
      },
      {
        "word": "月",
        "reading": "つき",
        "meaning": "bulan (langit)"
      }
    ],
    "day": 2
  },
  {
    "kanji": "火",
    "level": "N5",
    "meanings": [
      "api"
    ],
    "onyomi": [
      "カ"
    ],
    "kunyomi": [
      "ひ",
      "ほ"
    ],
    "examples": [
      {
        "word": "火曜日",
        "reading": "かようび",
        "meaning": "hari Selasa"
      },
      {
        "word": "火",
        "reading": "ひ",
        "meaning": "api"
      }
    ],
    "day": 2
  },
  {
    "kanji": "水",
    "level": "N5",
    "meanings": [
      "air"
    ],
    "onyomi": [
      "スイ"
    ],
    "kunyomi": [
      "みず"
    ],
    "examples": [
      {
        "word": "水曜日",
        "reading": "すいようび",
        "meaning": "hari Rabu"
      },
      {
        "word": "水",
        "reading": "みず",
        "meaning": "air"
      }
    ],
    "day": 2
  },
  {
    "kanji": "木",
    "level": "N5",
    "meanings": [
      "pohon",
      "kayu"
    ],
    "onyomi": [
      "モク",
      "ボク"
    ],
    "kunyomi": [
      "き",
      "こ"
    ],
    "examples": [
      {
        "word": "木曜日",
        "reading": "もくようび",
        "meaning": "hari Kamis"
      },
      {
        "word": "木",
        "reading": "き",
        "meaning": "pohon"
      }
    ],
    "day": 2
  },
  {
    "kanji": "金",
    "level": "N5",
    "meanings": [
      "emas",
      "uang"
    ],
    "onyomi": [
      "キン",
      "コン"
    ],
    "kunyomi": [
      "かね",
      "かな"
    ],
    "examples": [
      {
        "word": "金曜日",
        "reading": "きんようび",
        "meaning": "hari Jumat"
      },
      {
        "word": "お金",
        "reading": "おかね",
        "meaning": "uang"
      }
    ],
    "day": 2
  },
  {
    "kanji": "土",
    "level": "N5",
    "meanings": [
      "tanah"
    ],
    "onyomi": [
      "ド",
      "ト"
    ],
    "kunyomi": [
      "つち"
    ],
    "examples": [
      {
        "word": "土曜日",
        "reading": "どようび",
        "meaning": "hari Sabtu"
      },
      {
        "word": "土",
        "reading": "つち",
        "meaning": "tanah"
      }
    ],
    "day": 2
  },
  {
    "kanji": "人",
    "level": "N5",
    "meanings": [
      "orang"
    ],
    "onyomi": [
      "ジン",
      "ニン"
    ],
    "kunyomi": [
      "ひと"
    ],
    "examples": [
      {
        "word": "人",
        "reading": "ひと",
        "meaning": "orang"
      },
      {
        "word": "日本人",
        "reading": "にほんじん",
        "meaning": "orang Jepang"
      },
      {
        "word": "三人",
        "reading": "さんにん",
        "meaning": "tiga orang"
      }
    ],
    "day": 2
  },
  {
    "kanji": "男",
    "level": "N5",
    "meanings": [
      "pria",
      "laki-laki"
    ],
    "onyomi": [
      "ダン",
      "ナン"
    ],
    "kunyomi": [
      "おとこ"
    ],
    "examples": [
      {
        "word": "男の人",
        "reading": "おとこのひと",
        "meaning": "laki-laki"
      },
      {
        "word": "男性",
        "reading": "だんせい",
        "meaning": "pria"
      }
    ],
    "day": 2
  },
  {
    "kanji": "女",
    "level": "N5",
    "meanings": [
      "wanita",
      "perempuan"
    ],
    "onyomi": [
      "ジョ",
      "ニョ",
      "ニョウ"
    ],
    "kunyomi": [
      "おんな",
      "め"
    ],
    "examples": [
      {
        "word": "女の人",
        "reading": "おんなのひと",
        "meaning": "perempuan"
      },
      {
        "word": "女性",
        "reading": "じょせい",
        "meaning": "wanita"
      }
    ],
    "day": 2
  },
  {
    "kanji": "子",
    "level": "N5",
    "meanings": [
      "anak"
    ],
    "onyomi": [
      "シ",
      "ス"
    ],
    "kunyomi": [
      "こ"
    ],
    "examples": [
      {
        "word": "子ども",
        "reading": "こども",
        "meaning": "anak"
      },
      {
        "word": "女の子",
        "reading": "おんなのこ",
        "meaning": "anak perempuan"
      }
    ],
    "day": 2
  },
  {
    "kanji": "目",
    "level": "N5",
    "meanings": [
      "mata"
    ],
    "onyomi": [
      "モク",
      "ボク"
    ],
    "kunyomi": [
      "め",
      "ま"
    ],
    "examples": [
      {
        "word": "目",
        "reading": "め",
        "meaning": "mata"
      },
      {
        "word": "一番目",
        "reading": "いちばんめ",
        "meaning": "yang pertama"
      }
    ],
    "day": 2
  },
  {
    "kanji": "耳",
    "level": "N5",
    "meanings": [
      "telinga"
    ],
    "onyomi": [
      "ジ"
    ],
    "kunyomi": [
      "みみ"
    ],
    "examples": [
      {
        "word": "耳",
        "reading": "みみ",
        "meaning": "telinga"
      }
    ],
    "day": 2
  },
  {
    "kanji": "口",
    "level": "N5",
    "meanings": [
      "mulut"
    ],
    "onyomi": [
      "コウ",
      "ク"
    ],
    "kunyomi": [
      "くち"
    ],
    "examples": [
      {
        "word": "口",
        "reading": "くち",
        "meaning": "mulut"
      },
      {
        "word": "入口",
        "reading": "いりぐち",
        "meaning": "pintu masuk"
      }
    ],
    "day": 2
  },
  {
    "kanji": "手",
    "level": "N5",
    "meanings": [
      "tangan"
    ],
    "onyomi": [
      "シュ"
    ],
    "kunyomi": [
      "て",
      "た"
    ],
    "examples": [
      {
        "word": "手",
        "reading": "て",
        "meaning": "tangan"
      },
      {
        "word": "上手",
        "reading": "じょうず",
        "meaning": "mahir / pandai"
      }
    ],
    "day": 2
  },
  {
    "kanji": "足",
    "level": "N5",
    "meanings": [
      "kaki"
    ],
    "onyomi": [
      "ソク"
    ],
    "kunyomi": [
      "あし",
      "たる",
      "たりる"
    ],
    "examples": [
      {
        "word": "足",
        "reading": "あし",
        "meaning": "kaki"
      },
      {
        "word": "足りる",
        "reading": "たりる",
        "meaning": "cukup"
      }
    ],
    "day": 3
  },
  {
    "kanji": "力",
    "level": "N5",
    "meanings": [
      "tenaga",
      "kekuatan"
    ],
    "onyomi": [
      "リョク",
      "リキ"
    ],
    "kunyomi": [
      "ちから"
    ],
    "examples": [
      {
        "word": "力",
        "reading": "ちから",
        "meaning": "kekuatan"
      },
      {
        "word": "体力",
        "reading": "たいりょく",
        "meaning": "kekuatan fisik"
      }
    ],
    "day": 3
  },
  {
    "kanji": "山",
    "level": "N5",
    "meanings": [
      "gunung"
    ],
    "onyomi": [
      "サン",
      "セン"
    ],
    "kunyomi": [
      "やま"
    ],
    "examples": [
      {
        "word": "山",
        "reading": "やま",
        "meaning": "gunung"
      },
      {
        "word": "富士山",
        "reading": "ふじさん",
        "meaning": "Gunung Fuji"
      }
    ],
    "day": 3
  },
  {
    "kanji": "川",
    "level": "N5",
    "meanings": [
      "sungai"
    ],
    "onyomi": [
      "セン"
    ],
    "kunyomi": [
      "かわ"
    ],
    "examples": [
      {
        "word": "川",
        "reading": "かわ",
        "meaning": "sungai"
      },
      {
        "word": "川口",
        "reading": "かわぐち",
        "meaning": "muara sungai"
      }
    ],
    "day": 3
  },
  {
    "kanji": "天",
    "level": "N5",
    "meanings": [
      "langit",
      "surga"
    ],
    "onyomi": [
      "テン"
    ],
    "kunyomi": [
      "あめ",
      "あま"
    ],
    "examples": [
      {
        "word": "天気",
        "reading": "てんき",
        "meaning": "cuaca"
      },
      {
        "word": "天",
        "reading": "てん",
        "meaning": "langit / surga"
      }
    ],
    "day": 3
  },
  {
    "kanji": "気",
    "level": "N5",
    "meanings": [
      "semangat",
      "pikiran",
      "udara"
    ],
    "onyomi": [
      "キ",
      "ケ"
    ],
    "kunyomi": [],
    "examples": [
      {
        "word": "天気",
        "reading": "てんき",
        "meaning": "cuaca"
      },
      {
        "word": "元気",
        "reading": "げんき",
        "meaning": "sehat / bersemangat"
      }
    ],
    "day": 3
  },
  {
    "kanji": "空",
    "level": "N5",
    "meanings": [
      "langit",
      "kosong"
    ],
    "onyomi": [
      "クウ"
    ],
    "kunyomi": [
      "そら",
      "あく",
      "あける",
      "から"
    ],
    "examples": [
      {
        "word": "空",
        "reading": "そら",
        "meaning": "langit"
      },
      {
        "word": "空港",
        "reading": "くうこう",
        "meaning": "bandara"
      }
    ],
    "day": 3
  },
  {
    "kanji": "雨",
    "level": "N5",
    "meanings": [
      "hujan"
    ],
    "onyomi": [
      "ウ"
    ],
    "kunyomi": [
      "あめ",
      "あま",
      "-さめ"
    ],
    "examples": [
      {
        "word": "雨",
        "reading": "あめ",
        "meaning": "hujan"
      },
      {
        "word": "雨の日",
        "reading": "あめのひ",
        "meaning": "hari hujan"
      }
    ],
    "day": 3
  },
  {
    "kanji": "電",
    "level": "N5",
    "meanings": [
      "listrik"
    ],
    "onyomi": [
      "デン"
    ],
    "kunyomi": [],
    "examples": [
      {
        "word": "電車",
        "reading": "でんしゃ",
        "meaning": "kereta"
      },
      {
        "word": "電話",
        "reading": "でんわ",
        "meaning": "telepon"
      }
    ],
    "day": 3
  },
  {
    "kanji": "車",
    "level": "N5",
    "meanings": [
      "mobil",
      "kendaraan"
    ],
    "onyomi": [
      "シャ"
    ],
    "kunyomi": [
      "くるま"
    ],
    "examples": [
      {
        "word": "車",
        "reading": "くるま",
        "meaning": "mobil"
      },
      {
        "word": "電車",
        "reading": "でんしゃ",
        "meaning": "kereta"
      }
    ],
    "day": 3
  },
  {
    "kanji": "駅",
    "level": "N5",
    "meanings": [
      "stasiun"
    ],
    "onyomi": [
      "エキ"
    ],
    "kunyomi": [],
    "examples": [
      {
        "word": "駅",
        "reading": "えき",
        "meaning": "stasiun"
      },
      {
        "word": "駅前",
        "reading": "えきまえ",
        "meaning": "depan stasiun"
      }
    ],
    "day": 3
  },
  {
    "kanji": "道",
    "level": "N5",
    "meanings": [
      "jalan"
    ],
    "onyomi": [
      "ドウ",
      "トウ"
    ],
    "kunyomi": [
      "みち"
    ],
    "examples": [
      {
        "word": "道",
        "reading": "みち",
        "meaning": "jalan"
      },
      {
        "word": "北海道",
        "reading": "ほっかいどう",
        "meaning": "Hokkaido"
      }
    ],
    "day": 3
  },
  {
    "kanji": "町",
    "level": "N5",
    "meanings": [
      "kota kecil"
    ],
    "onyomi": [
      "チョウ"
    ],
    "kunyomi": [
      "まち"
    ],
    "examples": [
      {
        "word": "町",
        "reading": "まち",
        "meaning": "kota kecil"
      },
      {
        "word": "町中",
        "reading": "まちなか",
        "meaning": "di tengah kota"
      }
    ],
    "day": 3
  },
  {
    "kanji": "村",
    "level": "N5",
    "meanings": [
      "desa"
    ],
    "onyomi": [
      "ソン"
    ],
    "kunyomi": [
      "むら"
    ],
    "examples": [
      {
        "word": "村",
        "reading": "むら",
        "meaning": "desa"
      }
    ],
    "day": 3
  },
  {
    "kanji": "国",
    "level": "N5",
    "meanings": [
      "negara"
    ],
    "onyomi": [
      "コク"
    ],
    "kunyomi": [
      "くに"
    ],
    "examples": [
      {
        "word": "国",
        "reading": "くに",
        "meaning": "negara"
      },
      {
        "word": "外国",
        "reading": "がいこく",
        "meaning": "luar negeri"
      }
    ],
    "day": 3
  },
  {
    "kanji": "外",
    "level": "N5",
    "meanings": [
      "luar"
    ],
    "onyomi": [
      "ガイ",
      "ゲ"
    ],
    "kunyomi": [
      "そと",
      "ほか",
      "はずす",
      "はずれる"
    ],
    "examples": [
      {
        "word": "外国",
        "reading": "がいこく",
        "meaning": "luar negeri"
      },
      {
        "word": "外",
        "reading": "そと",
        "meaning": "luar"
      }
    ],
    "day": 4
  },
  {
    "kanji": "中",
    "level": "N5",
    "meanings": [
      "tengah",
      "dalam"
    ],
    "onyomi": [
      "チュウ"
    ],
    "kunyomi": [
      "なか",
      "うち",
      "あたる"
    ],
    "examples": [
      {
        "word": "中",
        "reading": "なか",
        "meaning": "dalam / tengah"
      },
      {
        "word": "中国",
        "reading": "ちゅうごく",
        "meaning": "Tiongkok"
      }
    ],
    "day": 4
  },
  {
    "kanji": "上",
    "level": "N5",
    "meanings": [
      "atas"
    ],
    "onyomi": [
      "ジョウ",
      "ショウ"
    ],
    "kunyomi": [
      "うえ",
      "あげる",
      "あがる",
      "のぼる"
    ],
    "examples": [
      {
        "word": "上",
        "reading": "うえ",
        "meaning": "atas"
      },
      {
        "word": "上手",
        "reading": "じょうず",
        "meaning": "mahir / pandai"
      }
    ],
    "day": 4
  },
  {
    "kanji": "下",
    "level": "N5",
    "meanings": [
      "bawah"
    ],
    "onyomi": [
      "カ",
      "ゲ"
    ],
    "kunyomi": [
      "した",
      "しも",
      "さげる",
      "さがる",
      "くだる",
      "おりる"
    ],
    "examples": [
      {
        "word": "下",
        "reading": "した",
        "meaning": "bawah"
      },
      {
        "word": "地下",
        "reading": "ちか",
        "meaning": "bawah tanah"
      }
    ],
    "day": 4
  },
  {
    "kanji": "左",
    "level": "N5",
    "meanings": [
      "kiri"
    ],
    "onyomi": [
      "サ"
    ],
    "kunyomi": [
      "ひだり"
    ],
    "examples": [
      {
        "word": "左",
        "reading": "ひだり",
        "meaning": "kiri"
      },
      {
        "word": "左手",
        "reading": "ひだりて",
        "meaning": "tangan kiri"
      }
    ],
    "day": 4
  },
  {
    "kanji": "右",
    "level": "N5",
    "meanings": [
      "kanan"
    ],
    "onyomi": [
      "ウ",
      "ユウ"
    ],
    "kunyo
