<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

        <title>Recibo N°{{ $clients[0]->sale_id }}</title>

        <style>
            @page { margin: 10px 10px 10px 10px;  }
            table{
                width: 100%;
                font-size: 9px;
                text-transform: uppercase;
            }  
        </style>
        

    </head>
    <body>
        @yield('content')         
    </body>
</html>
