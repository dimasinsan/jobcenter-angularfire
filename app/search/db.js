var db = angular.module("dbApp", ["firebase"]);

var URL = "https://jobcenter.firebaseio.com/";

db.controller("searchController", function($scope, $firebaseArray) {
  
  var ref2 = new Firebase(URL + 'labor');
//  var child = ref2.child("labor");
  $scope.datas = $firebaseArray(ref2);
  
  $scope.filter = {};
  $scope.input = {};
  $scope.apply = function() {
    for(prop in $scope.input) {
      $scope.filter[prop] = $scope.input[prop];
    }
  };
  
}); //end of searchController

db.controller("profileViewController", function ($scope, $firebaseArray) {

  var JOB_URL = "https://jobcenter.firebaseio.com/labor/0001";
  var ref = new Firebase(JOB_URL);
  $scope.messages = $firebaseArray(ref);

  //var child = ref.child('0001');

  ref.on("value", function (snap) {
    if (snap.val().kategori === "Rumah Tangga") {
      $scope.katData = snap.val().kategori;
      $scope.nameData = snap.val().name;
      $scope.ageData = snap.val().age;
      $scope.expData = snap.val().exp;
      $scope.gajiData = snap.val().gaji;
      $scope.genderData = snap.val().gender;
      $scope.lokasiData = snap.val().lokasi;
      $scope.maritalData = snap.val().marital;
      $scope.typeData = snap.val().type;
      $scope.statusData = snap.val().status;
      $scope.gambarData = snap.val().images;
    }
    else {
      alert("ALERT!");
    }
  });

  //var query = ref.orderByChild();

  //download data into a local object
  //var syncObject = $firebaseObject(ref);
  //syncObject.$bindTo($scope, "admin");

}); //end of db view controller

db.controller("branchViewController", function($scope, $firebaseArray) {
  
  var ref = new Firebase(URL + "branch");
//  var child = ref.child("branch");
  $scope.branches = $firebaseArray(ref);
  
}); // end of branch view controller

db.controller("laborPushController", function ($scope, $firebaseArray) {
  
  var ref = new Firebase(URL + 'labor');
  var inputNama = document.getElementById('inputNama');
  var inputTanggal = document.getElementById('inputTanggal');
  var inputAsal = document.getElementById('inputAsal');
  var inputAlamat = document.getElementById('inputAlamat');
  var inputLokasi = document.getElementById('inputLokasi');
  var inputKategori = document.getElementById('inputKategori');
  var inputProfesi = document.getElementById('inputProfesi');
  //var tersedia = "Ya";
  var inputGender = document.getElementById('inputGender');
  var inputWaktu = document.getElementById('inputWaktu');
  var inputPend = document.getElementById('inputPend');
  var inputStatus = document.getElementById('inputStatus');
  var inputAnak = document.getElementById('inputAnak');
  var inputTelp = document.getElementById('inputTelp');
  var inputAgama = document.getElementById('inputAgama');
  var inputSuku = document.getElementById('inputSuku');
  var inputGaji = document.getElementById('inputGaji');
  var inputKetrampilan = document.getElementById('inputKetrampilan');
  var inputAnjing = document.getElementById('inputAnjing');
  var inputExp = document.getElementById('inputExp');
  var inputExpln = document.getElementById('inputExpln');
  var inputIng = document.getElementById('inputIng');
  var inputTinggi = document.getElementById('inputTinggi');
  var inputBerat = document.getElementById('inputBerat');
  var inputHalal = document.getElementById('inputHalal');
  var inputLembur = document.getElementById('inputLembur');
  
  var btnSubmit = document.getElementById('btnSubmit');

        btnSubmit.addEventListener('click', function () {
            ref.push({
              nama: inputNama.value,
              tanggallahir: inputTanggal.value,
              asal: inputAsal.value,      
              alamat: inputAlamat.value,
              lokasi: inputLokasi.value,
              kategori: inputKategori.value,
              profesi: inputProfesi.value,
              tersedia: "ya",
              gender: inputGender.value,
              waktu: inputWaktu.value,
              pendidikan: inputPend.value,
              status: inputStatus.value,
              anak: inputAnak.value,              
              telp: inputTelp.value,
              agama: inputAgama.value,
              suku: inputSuku.value,
              gaji: inputGaji.value,
              ketrampilan: inputKetrampilan.value,
              anjing: inputAnjing.value,
              exp: inputExp.value,
              luarnegri: inputExpln.value,
              inggris: inputIng.value,
              tinggi: inputTinggi.value,
              berat: inputBerat.value,
              nonhalal: inputHalal.value,
              lembur: inputLembur.value
              
            });
        });
            
            //ref2.child().push([inputKodya.value]);     
                   
            // inputNama.value = '';
            // inputTanggal.value = '';            
            // inputAlamat.value = '';
            // inputKodya.value = '';
            // inputTelp.value = '';

        });
      //end of branch push controller

  /* push data into database with unique id
  pushRef.push({
    "nama": "Maryati",
    "tanggallahir": "27/04/1985",
    "asal": "Padang Panjang",
    "alamat": "Depok 2",
    "lokasi": "Depok",
    "kategori": "Rumah Tangga",
    "profesi": "Nanny",
    "tersedia": "ya",
    "gender": "Perempuan",
    "waktu": "Menginap",
    "pendidikan": "SD",
    "status": "Lajang",
    "anak": "0",
    "agama": "Islam",
    "suku": "Padang",
    "gaji": "2.700.000",
    "ketrampilan": "memasak, mencuci",
    "anjing": "ya",
    "pengalaman": "7",
    "luarnegri": "tidak",
    "inggris": "tidak",
    "tinggi": "162",
    "berat": "50",
    "images": "./Gallery/gadis_1.jpg",
    "non-halal": "ya",
    "lembur": "ya"
  });
*/
 //end of labor push controller

db.controller("branchPushController", function () {
  
  var ref = new Firebase(URL + 'branch');
  var ref2 = new Firebase(URL + 'lokasi');

  var inputNama = document.getElementById('inputNama');
  var inputAlamat = document.getElementById('inputAlamat');
  var inputKodya = document.getElementById('inputKodya');
  var inputTelp = document.getElementById('inputTelp');
  var btUpdateMessage = document.getElementById('btUpdateMessage');

        btUpdateMessage.addEventListener('click', function () {
            ref.push({
              nama: inputNama.value,
              alamat: inputAlamat.value,
              telp: inputTelp.value,
              kotamadya: inputKodya.value
            });
            
            //ref2.child().push([inputKodya.value]);     
                   
            inputNama.value = '';
            inputAlamat.value = '';
            inputKodya.value = '';
            inputTelp.value = '';

        });
      }); //end of branch push controller
  
  // var nama = $('#nameInput').val();
  // var alamat = $('#alamatInput').val();
  // var kotamadya = $('#kodyaInput').val();
  // var telp = $('#telpInput').val();
  
  // this.review = {};
  // this.add = function(ref){
  //   ref.push(this.review);
  //   this.review = {};
  // };
  //  var branchRef = ref.child("branch");

  //push data into database with unique id
  // ref.push({
  //   nama: nama,
  //   alamat: alamat,
  //   kotamadya: kotamadya,
  //   telp: telp
  // });


/* push() function

var postsRef = ref.child("posts");
  var newPostRef = postsRef.push();
  newPostRef.set({
    author: "gracehop",
    title: "Announcing COBOL, a New Programming Language"
  });
  // we can also chain the two calls together
  postsRef.push().set({
    author: "alanisawesome",
    title: "The Turing Machine"
  });

  // This is equivalent to the calls to push().set(...) above
  postsRef.push({
    author: "gracehop",
    title: "Announcing COBOL, a New Programming Language"
  });
*/
