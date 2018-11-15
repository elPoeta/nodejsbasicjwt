# nodejsbasicjwt
JWT nodejs authentication

#### TEST With CURL
    $ curl localhost:3000
    
    $ curl -X POST -H "Content-Type: application/json" localhost:3000/api/private

    $ curl -X POST -H "Content-Type: application/json" localhost:3000/api/login

    $ curl -X POST -H "Authorization: Bearer yourverylongtokenstring" localhost:3000/api/private
    
     