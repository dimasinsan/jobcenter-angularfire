var db = angular.module("dbApp", ["firebase", "angularUtils.directives.dirPagination"]);

var URL = "https://jobcenter.firebaseio.com/";

db.controller("searchController", ['$scope', '$firebaseArray', '$state', '$stateParams', '$rootScope', '$firebaseObject', '$http', function ($scope, $firebaseArray, $state, $stateParams, $rootScope, $firebaseObject, $http) {

  var ref = new Firebase(URL + 'branch');
  var ref2 = new Firebase(URL + 'worker');
  var ref3 = new Firebase("https://jobcenter.firebaseio.com/branch/" + $stateParams.branchId);
  var ref4 = new Firebase("https://jobcenter.firebaseio.com/worker/" + $stateParams.workerId);

  $scope.branches = $firebaseArray(ref);
  $scope.datas = $firebaseArray(ref2);
  $scope.branch = $firebaseObject(ref3);
  $scope.data = $firebaseObject(ref4);

  // $scope.submitForm = function (user) {

  //   if ($scope.userForm.$invalid === true) {
  //     $scope.notValid = true;
  //     return
  //   }
  //   $scope.postData = angular.copy(user);

  //   $http.post('/contact', $scope.postData)
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

    if ($scope.userForm.$valid) {
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
        alertify.alert('Terima Kasih Telah Memakai Jasa Kami! Anda akan dihubungi oleh customer service kami');
        $("#contactModal").modal("hide");                              
      })
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
  };
  
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

  // $scope.updateBranch = function (branch) {
  //   $rootScope.branch = branch;
  //   $state.go('branch-edit', { branchId: $rootScope.branch.$id });
  // }; //end of update branch

  // $scope.editBranch = function () {
  //   $scope.branch.$save()
  //     .then(function () {
  //       alert('Branch Updated!');
  //     }).catch(function (error) {
  //       alert('Error!')
  //     });
  //   $state.go('offices');
  // };  //end of edit branch

  // $scope.removeBranch = function (branch) {
  //   $scope.branch.$remove()
  //     .then(function () {
  //       alert('Branch Removed!');
  //     }).catch(function (error) {
  //       alert('Error!')
  //     });
  //   $state.go('offices');
  // };  //end of remove branch

  // $scope.updateWorker = function (data) {
  //   $rootScope.data = data;
  //   $state.go('worker-edit', { workerId: $rootScope.data.$id });
  // }; //end of update worker

  // var tanggal = document.getElementById('inputTanggal');
  // var gaji = document.getElementById('inputGaji');

  // $scope.editWorker = function () {
  //   $scope.data.$save()
  //     .then(ref4.update({ tanggallahir: tanggal.value, gaji: gaji.value }))
  //     .then(function () {
  //       alert('Worker Updated!');
  //     }).catch(function (error) {
  //       alert('Error!')
  //     });
  //   $state.go('workerprof');
  // };  //end of edit worker

  // $scope.removeWorker = function (data) {
  //   $scope.data.$remove()
  //     .then(function () {
  //       alert('Worker Removed!');
  //     }).catch(function (error) {
  //       alert('Error!')
  //     });
  //   $state.go('workerprof');
  // };  //end of remove worker
  
  
  $scope.filter = {};
  $scope.input = {};
  $scope.apply = function () {
    for (prop in $scope.input) {
      $scope.filter[prop] = $scope.input[prop];
    }   
  };  //end of filter button function
  
  //redirect for Indonesian
  $scope.redirect = function (event) {
    if (event.target.className !== 'button')
      $state.go('home');
  };  //end of scroll function
  
  //  Redirect with Filter Profesi -->
  $scope.redirectFilterInfal = function (event) {
    if (event.target.className !== 'button')
      $state.go('home');
    $scope.input.profesi = "Infal / Cuci-gosok";
    $scope.a = {};
    for (prop in $scope.a) {
      $scope.filter.profesi[prop] = $scope.a[prop];
    }   
  };  
  $scope.redirectFilterPembantu = function (event) {
    if (event.target.className !== 'button')
      $state.go('home');
    $scope.input.profesi = "Pembantu (Full-time)";
    $scope.a = {};
    for (prop in $scope.a) {
      $scope.filter.profesi[prop] = $scope.a[prop];
    }   
  };  
  $scope.redirectFilterKebun = function (event) {
    if (event.target.className !== 'button')
      $state.go('home');
    $scope.input.profesi = "Tukang Kebun";
    $scope.a = {};
    for (prop in $scope.a) {
      $scope.filter.profesi[prop] = $scope.a[prop];
    }   
  };
  $scope.redirectFilterBinatang = function (event) {
    if (event.target.className !== 'button')
      $state.go('home');
    $scope.input.profesi = "Penjaga Binatang Peliharaan";
    $scope.a = {};
    for (prop in $scope.a) {
      $scope.filter.profesi[prop] = $scope.a[prop];
    }   
  };  
  $scope.redirectFilterSopir = function (event) {
    if (event.target.className !== 'button')
      $state.go('home');
    $scope.input.profesi = "Sopir";
    $scope.a = {};
    for (prop in $scope.a) {
      $scope.filter.profesi[prop] = $scope.a[prop];
    }   
  };
  $scope.redirectFilterTukang = function (event) {
    if (event.target.className !== 'button')
      $state.go('home');
    $scope.input.profesi = "Tukang / Maintenance";
    $scope.a = {};
    for (prop in $scope.a) {
      $scope.filter.profesi[prop] = $scope.a[prop];
    }   
  };
  $scope.redirectFilterBaby = function (event) {
    if (event.target.className !== 'button')
      $state.go('home');
    $scope.input.profesi = "Baby Sitter";
    $scope.a = {};
    for (prop in $scope.a) {
      $scope.filter.profesi[prop] = $scope.a[prop];
    }   
  };
  $scope.redirectFilterNanny = function (event) {
    if (event.target.className !== 'button')
      $state.go('home');
    $scope.input.profesi = "Nanny / Perawat Orang Sakit";
    $scope.a = {};
    for (prop in $scope.a) {
      $scope.filter.profesi[prop] = $scope.a[prop];
    }   
  };
  $scope.redirectFilterSatpam = function (event) {
    if (event.target.className !== 'button')
      $state.go('home');
    $scope.input.profesi = "Satpam";
    $scope.a = {};
    for (prop in $scope.a) {
      $scope.filter.profesi[prop] = $scope.a[prop];
    }   
  };
  $scope.redirectFilterUmum = function (event) {
    if (event.target.className !== 'button')
      $state.go('home');
    $scope.input.profesi = "Pekerja Umum";
    $scope.a = {};
    for (prop in $scope.a) {
      $scope.filter.profesi[prop] = $scope.a[prop];
    }   
  };  //end of redirect indon filter
  
  //redirect for English
  $scope.redirecten = function (event) {
    if (event.target.className !== 'button')
      $state.go('home-en');
  };  //end of scroll function
  
  //  Redirect with Filter Profesi -->
  $scope.redirectFilterInfalen = function (event) {
    if (event.target.className !== 'button')
      $state.go('home-en');
    $scope.input.profesi = "Infal / Cuci-gosok";
    $scope.a = {};
    for (prop in $scope.a) {
      $scope.filter.profesi[prop] = $scope.a[prop];
    }   
  };  
  $scope.redirectFilterPembantuen = function (event) {
    if (event.target.className !== 'button')
      $state.go('home-en');
    $scope.input.profesi = "Pembantu (Full-time)";
    $scope.a = {};
    for (prop in $scope.a) {
      $scope.filter.profesi[prop] = $scope.a[prop];
    }   
  };  
  $scope.redirectFilterKebunen = function (event) {
    if (event.target.className !== 'button')
      $state.go('home-en');
    $scope.input.profesi = "Tukang Kebun";
    $scope.a = {};
    for (prop in $scope.a) {
      $scope.filter.profesi[prop] = $scope.a[prop];
    }   
  };
  $scope.redirectFilterBinatangen = function (event) {
    if (event.target.className !== 'button')
      $state.go('home-en');
    $scope.input.profesi = "Penjaga Binatang Peliharaan";
    $scope.a = {};
    for (prop in $scope.a) {
      $scope.filter.profesi[prop] = $scope.a[prop];
    }   
  };  
  $scope.redirectFilterSopiren = function (event) {
    if (event.target.className !== 'button')
      $state.go('home-en');
    $scope.input.profesi = "Sopir";
    $scope.a = {};
    for (prop in $scope.a) {
      $scope.filter.profesi[prop] = $scope.a[prop];
    }   
  };
  $scope.redirectFilterTukangen = function (event) {
    if (event.target.className !== 'button')
      $state.go('home-en');
    $scope.input.profesi = "Tukang / Maintenance";
    $scope.a = {};
    for (prop in $scope.a) {
      $scope.filter.profesi[prop] = $scope.a[prop];
    }   
  };
  $scope.redirectFilterBabyen = function (event) {
    if (event.target.className !== 'button')
      $state.go('home-en');
    $scope.input.profesi = "Baby Sitter";
    $scope.a = {};
    for (prop in $scope.a) {
      $scope.filter.profesi[prop] = $scope.a[prop];
    }   
  };
  $scope.redirectFilterNannyen = function (event) {
    if (event.target.className !== 'button')
      $state.go('home-en');
    $scope.input.profesi = "Nanny / Perawat Orang Sakit";
    $scope.a = {};
    for (prop in $scope.a) {
      $scope.filter.profesi[prop] = $scope.a[prop];
    }   
  };
  $scope.redirectFilterSatpamen = function (event) {
    if (event.target.className !== 'button')
      $state.go('home-en');
    $scope.input.profesi = "Satpam";
    $scope.a = {};
    for (prop in $scope.a) {
      $scope.filter.profesi[prop] = $scope.a[prop];
    }   
  };
  $scope.redirectFilterUmumen = function (event) {
    if (event.target.className !== 'button')
      $state.go('home-en');
    $scope.input.profesi = "Pekerja Umum";
    $scope.a = {};
    for (prop in $scope.a) {
      $scope.filter.profesi[prop] = $scope.a[prop];
    }   
  };  //end of redirect english filter

  //pagination
  $scope.currentPage = 1;
  $scope.pageSize = 15;

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
    $scope.gajiData = snap.val().gaji;
    $scope.ketData = snap.val().ketrampilan;
    $scope.gambarData = snap.val().foto;
    $scope.asalData = snap.val().asal;
    $scope.gajihData = snap.val().gajih;
    $scope.idk = snap.key();

    //var value = umur;
    var today = new Date();
    var dob = new Date(umur.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
    $scope.age = today.getFullYear() - dob.getFullYear(); //This is the update
    //$('#age').val(age); //for element id
  });

  //var query = ref.orderByChild();

  //download data into a local object
  //var syncObject = $firebaseObject(ref);
  //syncObject.$bindTo($scope, "admin");

  //modal popup on book button press with validation
  
  var bookRef = new Firebase(URL + 'booked');
  var date = new Date().getTime();
  $scope.submitForm = function () {

    if ($scope.userForm.$valid) {
      bookRef.child($scope.idk).set({
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
        ref2.update({tersedia: "booked"});        
        alertify.alert('Terima Kasih Telah Memakai Jasa Kami! Anda akan dihubungi oleh customer service kami');
        $("#contactModal").modal("hide");
        //$state.go('home');                       
      })
    } else {
      $scope.notValid = true;
    }
  };   

}); //end of profile view controller

db.controller("branchViewController", function ($scope, $firebaseArray) {

  var ref = new Firebase(URL + 'branch');
  $scope.branches = $firebaseArray(ref);
 
  // var lat = document.getElementById('lat');
  // var long = document.getElementById('long');
  
  $('#maps')
      .gmap3({
        center: [-6.175572666304688,106.82703861907953],
        zoom: 7
      })
      .cluster({
        size: 20,
        markers: [
          {position: [-6.31335512, 106.95156529999999]},
          {position: [-6.2826944, 106.6998767]},
          {position: [-7.575488700000001, 110.82432719999997]},
          {position: [-6.995603924682818, 110.42975690787353]},
          {position: [-6.618081999999999, 106.81704309999998]},
          {position: [-6.909624892235514, 107.61066847718507]}
        ],
        cb: function (markers) {
          if (markers.length > 1) { // 1 marker stay unchanged (because cb returns nothing)
            if (markers.length < 50) {
              return {
                content: "<div class='cluster cluster-1'>" + markers.length + "</div>",
                x: -100,
                y: -100
              };
            }
          }
        }
      });
  //  $.gmap3(false);
  //   var center = [-6.175529999999999 , 106.82278999999994 ];
    
  //   $('#maps')
  //     .gmap3({
  //       center: center,
  //       zoom: 6,
  //       mapTypeId : google.maps.MapTypeId.ROADMAP
  //     })
  //     .marker(function (map) {
  //       return {
  //         position: map.getCenter(),
  //         icon: 'http://maps.google.com/mapfiles/marker_green.png'
  //       };
  //     })
  //       .on('click', function (marker, event) {
  //         marker.setIcon('http://maps.google.com/mapfiles/marker_orange.png');
  //         setTimeout(function () {
  //           marker.setIcon('http://maps.google.com/mapfiles/marker_green.png');
  //         }, 200);
  //       });
  

//  $('#map').locationpicker ({
//     location: {
//         latitude: [],
//         longitude: []
//     },
//     radius: 100,
//     inputBinding: {
//         latitudeInput: $('#lat'),
//         longitudeInput: $('#long'),
//         //radiusInput: $('#us2-radius'),
//         locationNameInput: $('#alamat')
//     },
//     enableAutocomplete: true
//   });
 
 
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

 



    
      
      
      