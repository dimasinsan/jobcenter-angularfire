var db = angular.module("dbApp", ["firebase"]);

var URL = "https://jobcenter.firebaseio.com/";

db.controller("searchController", ['$scope', '$firebaseArray', '$state', '$stateParams', '$rootScope', '$firebaseObject', function($scope, $firebaseArray, $state, $stateParams, $rootScope, $firebaseObject) {
  
  var ref = new Firebase(URL + 'branch');
  var ref2 = new Firebase(URL + 'labor');  
  var ref3 = new Firebase("https://jobcenter.firebaseio.com/branch/" +  $stateParams.branchId);
  var ref4 = new Firebase("https://jobcenter.firebaseio.com/labor/" +  $stateParams.workerId);
      
  $scope.branches = $firebaseArray(ref);
  $scope.datas = $firebaseArray(ref2);
  $scope.branch = $firebaseObject(ref3);
  $scope.data = $firebaseObject(ref4);
  
  $scope.updateBranch = function (branch) {
    $rootScope.branch = branch;
    $state.go('branch-edit', {branchId: $rootScope.branch.$id});        
  }; //end of update branch
     
  $scope.editBranch = function () {      
    $scope.branch.$save()
    .then(function() {
        alert('Branch Updated!');
      }).catch(function(error) {
        alert('Error!')        
      });
      $state.go('offices');
  };  //end of edit branch
  
  $scope.removeBranch = function (branch) {         
    $scope.branch.$remove()
    .then(function() {
        alert('Branch Removed!');
      }).catch(function(error) {
        alert('Error!')        
      });
      $state.go('offices');
  };  //end of remove branch
  
  $scope.updateWorker = function (data) {
    $rootScope.data = data;
    $state.go('worker-edit', {workerId: $rootScope.data.$id});        
  }; //end of update worker
  
  $scope.editWorker = function () {      
    $scope.data.$save()
    .then(function() {
        alert('Worker Updated!');
      }).catch(function(error) {
        alert('Error!')        
      });
      $state.go('workerprof');
  };  //end of edit worker
  
  $scope.removeWorker = function (data) {         
    $scope.data.$remove()
    .then(function() {
        alert('Worker Removed!');
      }).catch(function(error) {
        alert('Error!')        
      });
      $state.go('workerprof');
  };  //end of remove worker
  
  $scope.filter = {};
  $scope.input = {};
  $scope.apply = function() {
    for(prop in $scope.input) {
      $scope.filter[prop] = $scope.input[prop];
    }
  };  //end of filter function     
   
}]); //end of searchController

db.controller("profileViewController", function ($scope, $firebaseArray, $rootScope, $state, $stateParams) {

  var JOB_URL = "https://jobcenter.firebaseio.com/labor/";
  var ref = new Firebase(JOB_URL);
  $scope.datas = $firebaseArray(ref);    
  
  $scope.viewProfile = function (data) {
    
    $rootScope.data = data;
    if ($rootScope.data.tersedia === 'ya'){
    $state.go('profiles', {workerId: $rootScope.data.$id});    
    }
    else{
      alert("Pekerja Tidak Tersedia");
    }
  
    }; //end of view Profile
  
  var ref2 = new Firebase("https://jobcenter.firebaseio.com/labor/" +  $stateParams.workerId);  

  ref2.on("value", function (snap) {     
      $scope.nameData = snap.val().nama;
      $scope.katData = snap.val().kategori;
      $scope.lokasiData = snap.val().lokasi;
      $scope.profesiData = snap.val().profesi;
      $scope.genderData = snap.val().gender;
      $scope.waktuData = snap.val().waktu;
      $scope.pendData = snap.val().pendidikan;
      $scope.statusData = snap.val().status;
      $scope.agamaData = snap.val().agama;
      $scope.sukuData = snap.val().suku;
      $scope.umurData = snap.val().tanggallahir;
      $scope.expData = snap.val().exp;
      $scope.explnData = snap.val().luarnegri;
      $scope.ingData = snap.val().inggris;
      $scope.tinggiData = snap.val().tinggi;
      $scope.beratData = snap.val().berat;
      $scope.halalData = snap.val().nonhalal;
      $scope.lemburData = snap.val().lembur;
      $scope.anjingData = snap.val().anjing;
      $scope.anakData = snap.val().anak;
      $scope.gajiData = snap.val().gaji;
      $scope.ketData = snap.val().ketrampilan;      
      $scope.gambarData = snap.val().images;
  });

  //var query = ref.orderByChild();

  //download data into a local object
  //var syncObject = $firebaseObject(ref);
  //syncObject.$bindTo($scope, "admin");
  
  //modal popup on book button press with validation
  $scope.submitForm = function(){
        
        if ($scope.userForm.$valid) {
            alert('our form is amazing');
        } else {
            $scope.notValid = true;
        }
    };

}); //end of profile view controller

db.controller("branchViewController", function($scope, $firebaseArray) {
  
  var ref = new Firebase(URL + 'branch');
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
              
            }).then(function() {
               alert('Branch Updated!');
               }).catch(function(error) {
                alert('Error!')        
               });
                $state.go('offices');;
        });                       

        }); //end of labor push controller

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
  var buttonAdd = document.getElementById('buttonAdd');

        buttonAdd.addEventListener('click', function () {
          var pushref =  ref.push({
              nama: inputNama.value,
              alamat: inputAlamat.value,
              telp: inputTelp.value,
              kotamadya: inputKodya.value
            }).then(function(ref){
              alert("Succesfull!");
            }, function(error) {
              alert("Error: ", error);
            });
            // var pushID = pushref.key();
            // alert("Succesfull! ");
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
