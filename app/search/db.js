var db = angular.module("dbApp", ["firebase", "angularUtils.directives.dirPagination"]);

var URL = "https://jobcenter.firebaseio.com/";

db.controller("searchController", ['$scope', '$firebaseArray', '$state', '$stateParams', '$rootScope', '$firebaseObject', '$http', function ($scope, $firebaseArray, $state, $stateParams, $rootScope, $firebaseObject, $http) {

  var ref = new Firebase(URL + 'branch');
  var ref2 = new Firebase(URL + 'worker');
  var ref4 = new Firebase("https://jobcenter.firebaseio.com/worker/" + $stateParams.workerId);

  $scope.branches = $firebaseArray(ref);
  $scope.datas = $firebaseArray(ref2);
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
 
  var bookRef = new Firebase(URL + 'booked');
  var date = new Date().getTime();
  
  $scope.submitForm = function () {
    //var admail = document.getElementById('lokasi');
    var data = ({
        user : $scope.user.name,
        email : $scope.user.email,
        telp : $scope.user.contact,
        nama: $scope.data.nama,
        location : $scope.data.lokasi,
        profesi: $scope.data.profesi,          
        message : $scope.user.comment,
        lokasi : document.getElementById('lokasi').value
    });
     //console.log(admail2);
    // console.log(+admail2.value);
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
  
  // filter gaji
  $scope.gaji = function (data) {
    var gajiNum = data.gajiNum;
    var min = $scope.min;
    var max = $scope.max;
    
    if (!gajiNum) {
      return false;
    }  
    if(min && gajiNum < min) {
      return false;
    }    
    if(max && gajiNum > max) {
      return false;
    }
    return true;
  };
  
  // filter usia
  $scope.usia = function(data){
    var tanggallahir = data.tanggallahir;
    var today = new Date();
    var dob = new Date(tanggallahir.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
    var age = today.getFullYear() - dob.getFullYear();
    $scope.umur = age;
    var min = $scope.usiamin;
    var max = $scope.usiamax;
    
    if (!age) {
      return false;
    }  
    if(min && age < min) {
      return false;
    }    
    if(max && age > max) {
      return false;
    }
    return true;
  };  
      
  $scope.isi = {};
   $scope.apply = function () {
     $scope.input = {};
     $scope.min = {};
     $scope.max = {};
  //   for (prop in $scope.input) {
  //     $scope.filter[prop] = $scope.input[prop];
  //   }   
   };  //end of filter button function
  
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
  }; 
  
  $scope.redirectFilterSPG = function (event) {
    $state.go('home');
    $scope.isi.value11 = "SPG";    
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
  };
  $scope.redirectFilterSPGen = function (event) {
    $state.go('home-en');
    $scope.isi.value11 = "SPG";    
  };  //end of redirect english filter
     //------------->x                        

}]); //end of searchController

db.controller("profileViewController", function ($scope, $firebaseArray, $rootScope, $state, $stateParams, $http) {

  var JOB_URL = "https://jobcenter.firebaseio.com/worker/";
  var ref = new Firebase(JOB_URL);
  $scope.datas = $firebaseArray(ref);      

  var ref2 = new Firebase("https://jobcenter.firebaseio.com/worker/" + $stateParams.workerId);      
  var ref3 = new Firebase(URL + 'branch');
  $scope.branches = $firebaseArray(ref3);

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
      alertify.error("Pekerja Sudah Di Booking");
      $state.go('home');   
    
    }
  });

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
        message : $scope.user.comment,
        lokasi : document.getElementById('lokasi').value
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

  var markers = [];
  $scope.branches.$loaded()
    .then(function(){
      angular.forEach($scope.branches, function(value, key){
        this.push({position: [value.lat, value.long]});           
      }, markers);
    
    $('#maps')
    .gmap3({
      center: [-6.175572666304688,106.82703861907953],
      zoom: 7
    })
    .cluster({
      size: 20,
      markers: markers,
      cb: function (markers) {
        if (markers.length > 1) { // 1 marker stay unchanged (because cb returns nothing)
          if (markers.length < 50) {
            return {
              content: "<div class='cluster cluster-1'>" + markers.length + "</div>",
              x: -50,
              y: -50
            };
          }
        }
      }
    });
    
  });
       
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