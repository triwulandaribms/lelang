# PROJEK LELANG

  ## Role yang tersedia :
  1. admin
  2. seller
  3. buyer

  *ilustrasi program* 
  
   ** admin, yang bisa dilakukan role admin : **
    - bisa melakukan registrasi dan login
    - bisa mendapatkan list data pengguna/user
    - bisa melakukan penghapusan pengguna/user
    - bisa melakukan list auction dengan status (approved, rejected, waiing for approval)
    - bisa melakukan status menjadi approved untuk memulai pelelangan
    - bisa melakukan status reject untuk penolakan saat pelelangan
  

   ** seller, yang bisa dilakukan role seller : **
    - bisa melakukan registrasi, dengan syarat memasukan token dari role admin pada auth
    - bisa melakukan login seller, untuk mendapatkan token
    - bisa melakukan reset password, dengan memasukan token seller ke auth
    - bisa update profil, dengan memasukan token seller ke auth
    - bisa melakukan create auction dengan role seller
  

   ** buyer, yang bisa dilakukan role buyer : **
    - bisa melakukan registrasi, dengan syarat memasukan token dari role admin pada auth
    - bisa melakukan login buyer, untuk mendapatkan token
    - bisa melakukan reset password, dengan memasukan token buyer ke auth
    - bisa update profil, dengan memasukan token buyer ke auth
    - bisa melakukan list auction dengan status approved
    - bisa melakukan create bidding 