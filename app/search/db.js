var db = angular.module("dbApp", ["firebase", "angularUtils.directives.dirPagination"]);

var URL = "https://jobcenter.firebaseio.com/";

db.controller("searchController", ['$scope', '$firebaseArray', '$state', '$stateParams', '$rootScope', '$firebaseObject', '$http', function ($scope, $firebaseArray, $state, $stateParams, $rootScope, $firebaseObject, $http) {

  var ref = new Firebase(URL + 'branch');
  var ref2 = new Firebase(URL + 'worker');
  //var ref3 = new Firebase("https://jobcenter.firebaseio.com/branch/" + $stateParams.branchId);
  var ref4 = new Firebase("https://jobcenter.firebaseio.com/worker/" + $stateParams.workerId);

  $scope.branches = $firebaseArray(ref);
  $scope.datas = $firebaseArray(ref2);
  //$scope.branch = $firebaseObject(ref3);
  $scope.data = $firebaseObject(ref4);
  
  //pagination
  $scope.currentPage = 1;
  $scope.pageSize = 10;
  //$scope.users = []; same with datas
    //$scope.totalUsers = 0;
    //$scope.usersPerPage = 25; // this should match however many results your API puts on one page, same with page size
    // getResultsPage(1);
    
    // $scope.pagination = {
    //     currentPage: 1
    // };
    // $scope.pageChanged = function(newPage) {
    //     getResultsPage(newPage);
    // };
    // function getResultsPage(pageNumber) {
    //     // this is just an example, in reality this stuff should be in a service
    //     $http.get('path/to/api/users?page=' + pageNumber)
    //         .then(function(result) {
    //             $scope.users = result.data.Items;
    //             $scope.totalUsers = result.data.Count
    //         });
    // }
  
  // $scope.submitForm = function (user) {
  //   var data = ({
  //       user : $scope.user.name,
  //       email : $scope.user.email,
  //       telp : $scope.user.contact,
  //       nama: $scope.data.nama,
  //       location : $scope.data.lokasi,
  //       profesi: $scope.data.profesi,          
  //       message : $scope.user.comment
  //   });
    
  //   $http.post('/modal', data)
  //     .success(function (data) {
  //       alert('successfully emailed form');
  //     })
  //     .error(function (data) {
  //       alert('something went wrong');
  //     });
  // };
  
 
  var bookRef = new Firebase(URL + 'booked');
  var date = new Date().getTime();
   
  $scope.submitForm = function () {
    var data = ({
        user : $scope.user.name,
        email : $scope.user.email,
        telp : $scope.user.contact,
        nama: $scope.data.nama,
        location : $scope.data.lokasi,
        profesi: $scope.data.profesi,          
        message : $scope.user.comment
    });
    if ($scope.userForm.$valid) {
      $("#contactModal").modal("hide");
      alertify.confirm("Terima Kasih Telah Memakai Jasa Kami! Anda akan dihubungi oleh customer service kami", function (e) {    
        if (e) {
      bookRef.child($scope.data.$id).set({
        nama: $scope.data.nama,
        id: $scope.data.$id,
        user: $scope.user.name,
        lokasi: $scope.data.lokasi,
        email: $scope.user.email,
        contact: $scope.user.contact,
        comment: $scope.user.comment,
        status: "booked",
        bookDate: date,
        profesi: $scope.data.profesi
      })
      .then(function () {
        ref4.update({tersedia: "booked"});
        $http.post('/modal', data)
        .success(function (data) {
          alertify.success('successfully emailed form');
        })
        .error(function (data) {
          alertify.error('email failed');
        });        
        //alertify.alert('Terima Kasih Telah Memakai Jasa Kami! Anda akan dihubungi oleh customer service kami');
        $state.go('home');                             
      })
       }
      });
    } else {
      $scope.notValid = true;
    }
  };
  
   $scope.bookProfile = function (data) {

    $rootScope.data = data;    
    $state.go('homie', { workerId: $rootScope.data.$id });   
  };
  
  $scope.bookProfileen = function (data) {
    $rootScope.data = data;    
    $state.go('homien', { workerId: $rootScope.data.$id });   
  }; // end of book modal eng
  
  $scope.viewProfile = function (data) {
    $rootScope.data = data;
    if ($rootScope.data.tersedia === 'available') {
      $state.go('profiles', { workerId: $rootScope.data.$id });
    }
    else {
      alert("Pekerja Tidak Tersedia");
    }
  }; //end of view Profile
        //------------->x  

  //$scope.filter = {};
  $scope.input = {};
  $scope.isi = {};
  // $scope.apply = function () {
  //   for (prop in $scope.input) {
  //     $scope.filter[prop] = $scope.input[prop];
  //   }   
  // };  //end of filter button function
  
  //redirect for Indonesian
  $scope.redirect = function (event) {
    if (event.target.className !== 'button')
      $state.go('home');
  };  //end of scroll to worker icon function
  
  //  Redirect with Filter Profesi -->
  $scope.redirectFilterInfal = function () {
    //if (event.target.className !== 'button')
    $state.go('home');
    $scope.isi.value1 = "Infal / Cuci-gosok";
    //$scope.a = {};
    //  for (prop in $scope.isi.value) {
    //    $scope.filter[prop] = $scope.isi.value[prop];
    //  }   
  };  
  $scope.redirectFilterPembantu = function (event) {
    $state.go('home');
    $scope.isi.value2 = "Pembantu (Full-time)";    
  };  
  $scope.redirectFilterKebun = function (event) {    
    $state.go('home');
    $scope.isi.value3 = "Tukang Kebun";    
  };
  $scope.redirectFilterBinatang = function (event) {
    $state.go('home');
    $scope.isi.value4 = "Penjaga Binatang Peliharaan";
  };  
  $scope.redirectFilterSopir = function (event) {
    $state.go('home');
    $scope.isi.value5 = "Sopir";     
  };
  $scope.redirectFilterTukang = function (event) {
    $state.go('home');
    $scope.isi.value6 = "Tukang / Maintenance";    
  };
  $scope.redirectFilterBaby = function (event) {
    $state.go('home');
    $scope.isi.value7 = "Baby Sitter";    
  };
  $scope.redirectFilterNanny = function (event) {
    $state.go('home');
    $scope.isi.value8 = "Nanny / Perawat Orang Sakit";    
  };
  $scope.redirectFilterSatpam = function (event) {
    $state.go('home');
    $scope.isi.value9 = "Satpam";    
  };
  $scope.redirectFilterUmum = function (event) {
    $state.go('home');
    $scope.isi.value10 = "Pekerja Umum";    
  };  //end of redirect indon filter
  
  //redirect for English
  $scope.redirecten = function (event) {
    if (event.target.className !== 'button')
      $state.go('home-en');
  };  //end of scroll to worker icon function
  
  //  Redirect with Filter Profesi -->
  $scope.redirectFilterInfalen = function (event) {
    $state.go('home-en');
    $scope.isi.value1 = "Infal / Cuci-gosok";    
  };  
  $scope.redirectFilterPembantuen = function (event) {
    $state.go('home-en');
    $scope.isi.value2 = "Pembantu (Full-time)";    
  };  
  $scope.redirectFilterKebunen = function (event) {
    $state.go('home-en');
    $scope.isi.value3 = "Tukang Kebun";
  };
  $scope.redirectFilterBinatangen = function (event) {
    $state.go('home-en');
    $scope.isi.value4 = "Penjaga Binatang Peliharaan";    
  };  
  $scope.redirectFilterSopiren = function (event) {
    $state.go('home-en');
    $scope.isi.value5 = "Sopir";    
  };
  $scope.redirectFilterTukangen = function (event) {
    $state.go('home-en');
    $scope.isi.value6 = "Tukang / Maintenance";    
  };
  $scope.redirectFilterBabyen = function (event) {
    $state.go('home-en');
    $scope.isi.value7 = "Baby Sitter";    
  };
  $scope.redirectFilterNannyen = function (event) {
    $state.go('home-en');
    $scope.isi.value8 = "Nanny / Perawat Orang Sakit";    
  };
  $scope.redirectFilterSatpamen = function (event) {
    $state.go('home-en');
    $scope.isi.value9 = "Satpam";   
  };
  $scope.redirectFilterUmumen = function (event) {
    $state.go('home-en');
    $scope.isi.value10 = "Pekerja Umum";    
  };  //end of redirect english filter
     //------------->x 
        
  //sort table
  // $scope.sortType = "kategori";
  // $scope.sortReverse = true;

  // $(function () {
  //   $('#inputGaji').number(true, '', '.');
  // });

  //  // upload picture and convert to base64
  // $scope.data = {}; //init variable
  //   $scope.click = function() { //default function, to be override if browser supports input type='file'
  //     $scope.data.alert = "Your browser doesn't support HTML5 input type='File'"
  //   }

  //   var fileSelect = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
  //   fileSelect.type = 'file';

  //   if (fileSelect.disabled) { //check if browser support input type='file' and stop execution of controller
  //     return;
  //   }

  //     $scope.click = function() { //activate function to begin input file on click
  //       fileSelect.click();
  //     }

  //     fileSelect.onchange = function() { //set callback to action after choosing file
  //       var f = fileSelect.files[0], r = new FileReader();

  //       r.onloadend = function(e) { //callback after files finish loading
  //         $scope.data.b64 = e.target.result;
  //         $scope.$apply();
  //         console.log($scope.data.b64.replace(/^data:image\/(png|jpg);base64,/, "")); //replace regex if you want to rip off the base 64 "header"

  //         //here you can send data over your server as desired
  //       }

  //       r.readAsDataURL(f); //once defined all callbacks, begin reading the file

  //     };
  // // end of upload picture and convert to base64                       

}]); //end of searchController

db.controller("profileViewController", function ($scope, $firebaseArray, $rootScope, $state, $stateParams) {

  var JOB_URL = "https://jobcenter.firebaseio.com/worker/";
  var ref = new Firebase(JOB_URL);
  $scope.datas = $firebaseArray(ref);    

  // //pagination
  // $scope.currentPage = 1;
  // $scope.pageSize = 10;      

  var ref2 = new Firebase("https://jobcenter.firebaseio.com/worker/" + $stateParams.workerId);      
  
  ref2.on("value", function (snap) {
    if (snap.val().tersedia === "available") {
      
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
      var umur = snap.val().tanggallahir;
      $scope.expData = snap.val().exp;
      $scope.explnData = snap.val().luarnegri;
      $scope.ingData = snap.val().inggris;
      $scope.tinggiData = snap.val().tinggi;
      $scope.beratData = snap.val().berat;
      $scope.halalData = snap.val().nonhalal;
      $scope.lemburData = snap.val().lembur;
      $scope.anjingData = snap.val().anjing;
      $scope.anakData = snap.val().anak;
      //$scope.gajiData = snap.val().gaji;
      $scope.gaji = snap.val().gajiNum;
      $scope.ketData = snap.val().ketrampilan;
      $scope.gambarData = snap.val().foto;
      $scope.asalData = snap.val().asal;
      $scope.gajihData = snap.val().gajih;
      //$scope.gajih = snap.val().gajih;
      $scope.idk = snap.key();

      //var value = umur;
      var today = new Date();
      var dob = new Date(umur.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
      $scope.age = today.getFullYear() - dob.getFullYear(); //This is the update
      //$('#age').val(age); //for element id
  
    } else {
      //alertify.alert("Pekerja Tidak Tersedia");
      $state.go('home');   
    
    }
  });
  // function close(){
  //     var j = 5;
  //     for (var i=0; i<j; i++) {
  //       document.body.innerHTML += i;
  //               
  //   }    
    
  //   };

  //var query = ref.orderByChild();

  //download data into a local object
  //var syncObject = $firebaseObject(ref);
  //syncObject.$bindTo($scope, "admin");

  //modal popup on book button press with validation  
  var bookRef = new Firebase(URL + 'booked');
  var date = new Date().getTime();
  $scope.submitForm = function () {
    var data = ({
        user : $scope.user.name,
        email : $scope.user.email,
        telp : $scope.user.contact,
        nama: $scope.data.nama,
        location : $scope.data.lokasi,
        profesi: $scope.data.profesi,          
        message : $scope.user.comment
    });
    if ($scope.userForm.$valid) {
      $("#contactModal").modal("hide");
      alertify.confirm("Terima Kasih Telah Memakai Jasa Kami! Anda akan dihubungi oleh customer service kami", function (e) {    
        if (e) {
      bookRef.child($scope.idk).set(angular.fromJson(angular.toJson({
        nama: $scope.data.nama,
        id: $scope.data.$id,
        user: $scope.user.name,
        lokasi: $scope.data.lokasi,
        email: $scope.user.email,
        contact: $scope.user.contact,
        comment: $scope.user.comment,
        status: "booked",
        bookDate: date,
        profesi: $scope.data.profesi
      })))
      .then(function () {
        ref2.update({tersedia: "booked"});   
        $http.post('/modal', data)
        .success(function (data) {
          alertify.success('successfully emailed form');
        })
        .error(function (data) {
          alertify.error('email failed');
        });          
        //alertify.alert('Terima Kasih Telah Memakai Jasa Kami! Anda akan dihubungi oleh customer service kami');        
        $state.go('home');                       
      })
        }
      });
    } else {
      $scope.notValid = true;
    }
  };   

}); //end of profile view controller

db.controller("branchViewController", function ($scope, $firebaseArray, $http) {

  var ref = new Firebase(URL + 'branch');
  $scope.branches = $firebaseArray(ref);

  //NODEMAILER
  
  
  $scope.submitForm = function (user) {
    var data = ({
        name : $scope.user.name,
        email : $scope.user.email,
        subject : $scope.user.subject,
        location : $scope.user.location,          
        message : $scope.user.message
    });
    
    // if ($scope.userForm.$invalid === true) {
    //   $scope.notValid = true;
    //   return
    // }
    // $scope.postData = angular.copy(user);

    $http.post('/contact', data)
      // .success(function (data) {
      //   alertify.success('successfully emailed form');
      // })
      // .error(function (data) {
      //   alertify.error('something went wrong');
      // });
      .then(function () {
        alertify.success('successfully emailed form');
      }).catch(function (error) {
        alertify.error('something went wrong');
      });
      $scope.user.name = '';
      $scope.user.email = '';
      $scope.user.subject = '';
      $scope.user.location = '';
      $scope.user.message = '';
  };
  
}); // end of branch view controller

/*
db.controller("laborPushController", ['$scope', '$firebaseArray', '$state', function ($scope, $firebaseArray, $state) {

  var ref2 = new Firebase(URL + 'branch');
  $scope.branches = $firebaseArray(ref2);

  var ref = new Firebase(URL + 'labor');
  $scope.push = $firebaseArray(ref);

  var tanggal = document.getElementById('inputTanggal');
  var gaji = document.getElementById('inputGaji');

  $scope.pushWorker = function () {
    $scope.push.$add({
      foto: $scope.data.b64,
      nama: $scope.inputNama,
      tanggallahir: tanggal.value,
      asal: $scope.inputAsal,
      alamat: $scope.inputAlamat,
      lokasi: $scope.inputLokasi,
      kategori: $scope.inputKategori,
      profesi: $scope.inputProfesi,
      tersedia: "ya",
      gender: $scope.inputGender,
      waktu: $scope.inputWaktu,
      pendidikan: $scope.inputPend,
      status: $scope.inputStatus,
      anak: $scope.inputAnak,
      telp: $scope.inputTelp,
      agama: $scope.inputAgama,
      suku: $scope.inputSuku,
      gaji: gaji.value,
      ketrampilan: $scope.inputKetrampilan,
      anjing: $scope.inputAnjing,
      exp: $scope.inputExp,
      luarnegri: $scope.inputExpln,
      inggris: $scope.inputIng,
      tinggi: $scope.inputTinggi,
      berat: $scope.inputBerat,
      nonhalal: $scope.inputHalal,
      lembur: $scope.inputLembur,
      gajih: $scope.inputGajih
    })
      .then(function () {
        alert('Worker Added!');
      }).catch(function (error) {
        alert('Error!')
      });
    $state.go('workerprof');
  };  //end of push worker

  // upload picture and convert to base64
  $scope.data = {}; //init variable
  $scope.click = function () { //default function, to be override if browser supports input type='file'
    $scope.data.alert = "Your browser doesn't support HTML5 input type='File'"
  }

  var fileSelect = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
  fileSelect.type = 'file';

  if (fileSelect.disabled) { //check if browser support input type='file' and stop execution of controller
    return;
  }

  $scope.click = function () { //activate function to begin input file on click
    fileSelect.click();
  }

  fileSelect.onchange = function () { //set callback to action after choosing file
    var f = fileSelect.files[0], r = new FileReader();

    r.onloadend = function (e) { //callback after files finish loading
      $scope.data.b64 = e.target.result;
      $scope.$apply();
      console.log($scope.data.b64.replace(/^data:image\/(png|jpg);base64,/, "")); //replace regex if you want to rip off the base 64 "header"

      //here you can send data over your server as desired
    }

    r.readAsDataURL(f); //once defined all callbacks, begin reading the file

  };
  // end of upload picture and convert to base64  


  $(function () {
    // Set up the number formatting.
    $('#inputGaji').number(true, '', '.');
    $('#inputGajih').number(true, '', '.');

    //https://github.com/customd/jquery-number.
  });

}]); //end of labor push controller
*/

/*
db.controller("branchPushController", function () {

  var ref = new Firebase(URL + 'branch');
  var ref2 = new Firebase(URL + 'lokasi');

  var inputNama = document.getElementById('inputNama');
  var inputAlamat = document.getElementById('inputAlamat');
  var inputKodya = document.getElementById('inputKodya');
  var inputTelp = document.getElementById('inputTelp');
  var buttonAdd = document.getElementById('buttonAdd');

  buttonAdd.addEventListener('click', function () {
    var pushref = ref.push({
      nama: inputNama.value,
      alamat: inputAlamat.value,
      telp: inputTelp.value,
      kotamadya: inputKodya.value
    }).then(function (ref) {
      alert("Succesfull!");
    }, function (error) {
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
