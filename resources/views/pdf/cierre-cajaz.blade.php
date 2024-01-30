@extends('layoutcajaZ')

@section('content')
    <table>
        <tbody>

            <tr>
                <td colspan="2" style="border: 0px; padding-bottom: 10px;"><b>{{ $clients[0]->client_razonSocial }}</b>
                </td>
            </tr>
            <tr>
                <td style="border: 0px;">Direccion</td>
                <td style="border: 0px;">{{ $clients[0]->client_address }}</td>
            </tr>

            <tr>
                <td style="border: 0px;">Telefono</td>

                <td style="border: 0px;">{{ $clients[0]->client_phone }}</td>
            </tr>

            <tr>
                <td style="border: 0px;">Fecha</td>
                <td style="border: 0px;">{{ $clients[0]->sale_updated_at }}</td>
            </tr>

            <tr>
                <td style="border: 0px;">Empleado</td>
                <td style="border: 0px;">{{ $clients[0]->user_name }}</td>
            </tr>

        </tbody>
    </table>
    <hr>

    <table>
        <tbody>
            <?php $totalServicio = 0; ?>
            @foreach ($products as $product)
                <tr>
                    <td style="border: 0px;" colspan="2">{{ $product->name }}</td>
                </tr>
                <tr>
                    <td style="border: 0px;" width="600px">{{ $product->quantity }} X
                        {{-- ${{ round($product->price * $product->utility + $product->price - ($product->price * $product->utility + $product->price) * $product->descuento) }} --}}
                        @if ($product->descuento > 0)
                            ${{ $product->total / $product->quantity - ($product->total / $product->quantity) * $product->descuento }}
                        @else
                            ${{ $product->total / $product->quantity }}
                        @endif
                    </td>
                    <td style="border: 0px;">
                        {{-- ${{ round($product->price * $product->quantity * $product->utility + $product->price * $product->quantity - ($product->price * $product->quantity * $product->utility + $product->price * $product->quantity) * $product->descuento) }} --}}
                        @if ($product->descuento > 0)
                            ${{ $product->total - $product->total * $product->descuento }}
                            <?php $totalServicio += $product->total - $product->total * $product->descuento; ?>
                        @else
                            ${{ $product->total }}
                            <?php $totalServicio += $product->total; ?>
                        @endif
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <hr>

    <table>
        <tbody>
            <tr>
                <th style="border: 0px;" width="600px">TOTAL</th>
                <th style="border: 0px;">${{ number_format($totalServicio, 0, ',', '.') }}</th>
            </tr>
        </tbody>
    </table>
@endsection
