@extends('layoutsale')

@section('content')
    <table>
        <tbody>
            @foreach ($clients as $client)
                <tr>
                    <td colspan="2" style="border: 0px; padding-bottom: 10px;"><b>{{ $client->client_razonSocial }}</b>
                    </td>
                </tr>
                <tr>
                    <td style="border: 0px;">Recibo</td>

                    <td style="border: 0px;">{{ $client->sale_id }}</td>
                </tr>

                <tr>
                    <td style="border: 0px;">Direccion</td>
                    <td style="border: 0px;">{{ $client->client_address }}</td>
                </tr>

                <tr>
                    <td style="border: 0px;">Telefono</td>

                    <td style="border: 0px;">{{ $client->client_phone }}</td>
                </tr>

                <tr>
                    <td style="border: 0px;">Fecha</td>
                    <td style="border: 0px;">{{ $client->sale_updated_at }}</td>
                </tr>

                <tr>
                    <td style="border: 0px;">Empleado</td>
                    <td style="border: 0px;">{{ $client->user_name }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
    <hr style="margin-bottom: 5px; margin-top: 5px;">

    <table>
        <tbody>
            <?php $totalServicio = 0; ?>
            @foreach ($products as $product)
                <tr>
                    <td style="border: 0px;" colspan="3">{{ $product->name }}</td>
                </tr>

                <tr>
                    @if ($client->descuento > 0)
                        <td style="border: 0px;">{{ $product->quantity }} X ${{ ($product->total / $product->quantity) -  (($product->total / $product->quantity) * $client->descuento)}}</td>
                    @else
                        <td style="border: 0px;">{{ $product->quantity }} X ${{ $product->total / $product->quantity }}
                        </td>
                    @endif
                    <td style="border: 0px;" width="50px"></td>
                    @if ($client->descuento > 0)
                        <td style="border: 0px;" width="50px">${{ $product->total - ($product->total * $client->descuento) }}</td>
                    @else
                        <td style="border: 0px;" width="50px">${{ $product->total }}</td>
                    @endif
                    <?php $totalServicio += $product->total; ?>
                </tr>
            @endforeach
        </tbody>
    </table>

    <hr style="margin-bottom: 5px; margin-top: 5px;">

    <table>
        <tbody>
            <tr>
                <th style="border: 0px;">TOTAL</th>
                <td style="border: 0px;" width="50px"></td>
                @if ($client->descuento > 0)
                    <th style="border: 0px;" width="50px">
                        ${{ number_format($totalServicio * $client->descuento, 0, ',', '.') }}
                    </th>
                @else
                    <th style="border: 0px;" width="50px">${{ number_format($totalServicio, 0, ',', '.') }}</th>
                @endif
            </tr>
        </tbody>
    </table>
@endsection
