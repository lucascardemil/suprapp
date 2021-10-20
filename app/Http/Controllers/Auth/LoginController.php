<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Http\Request;
use PragmaRX\Google2FA\Google2FA;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Writer as BaconQrCodeWriter;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use BaconQrCode\Renderer\Image\ImagickImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    // public function login(Request $request)
    // {
    //     $this->validateLogin($request);

    //     if ($this->hasTooManyLoginAttempts($request)) {
    //         $this->fireLockoutEvent($request);

    //         return $this->sendLockoutResponse($request);
    //     }

    //     $user = User::where($this->username(), '=', $request->email)->first();

    //     if (password_verify($request->password, optional($user)->password)) {
    //         $this->clearLoginAttempts($request);



    //             $user->update(['token' => (new Google2FA)->generateSecretKey()]);

    //             $urlQR = $this->createUserUrlQR($user);


    //         return view("auth.2fa", compact('urlQR', 'user'));
    //     }

    //     $this->incrementLoginAttempts($request);

    //     return $this->sendFailedLoginResponse($request);
    // }

    public function login(Request $request, $url)
    {
        $users = User::where('url', $url)->get();
        if($users[0]->email == $request['email']){
            $this->validateLogin($request);

            // If the class is using the ThrottlesLogins trait, we can automatically throttle
            // the login attempts for this application. We'll key this by the username and
            // the IP address of the client making these requests into this application.
            if (method_exists($this, 'hasTooManyLoginAttempts') &&
                $this->hasTooManyLoginAttempts($request)) {
                $this->fireLockoutEvent($request);

                return $this->sendLockoutResponse($request);
            }

            if ($this->attemptLogin($request)) {
                return $this->sendLoginResponse($request);
            }

            // If the login attempt was unsuccessful we will increment the number of attempts
            // to login and redirect the user back to the login form. Of course, when this
            // user surpasses their maximum number of attempts they will get locked out.
            $this->incrementLoginAttempts($request);

            return $this->sendFailedLoginResponse($request);
        }else{
            return redirect()->route('acceso', ['url' => $url]);
        }
    }


    public function showLoginForm($url = null)
    {
        if(isset($url)){
            $users = User::where('url', $url)->get();
            foreach ($users as $user) {
                if(!empty($user->url)){
                    if($user->url == $url){
                        return view('auth.login', ['url' => $url]);
                    }else{
                        return redirect()->route('acceso', ['url' => $user->url, 'name' => $user->name]);
                    }
                }else{
                    return redirect()->route('acceso', ['url' => $user->url, 'name' => $user->name]);
                }
            }
        }else{
            return redirect('error_ip');
        }
    }


    public function logout(Request $request, $url)
    {
        $this->guard()->logout();

        $request->session()->invalidate();

        // $users = User::where('mac', $this->mac())->get();
        // foreach ($users as $user) {
        //     return $this->loggedOut($request) ?: redirect()->route('acceso', ['url' => $user->url]);
        // }

        return $this->loggedOut($request) ?: redirect()->route('acceso', ['url' => $url]);
    }

    // public function createUserUrlQR($user)
    // {
    //     $bacon = new BaconQrCodeWriter(new ImageRenderer(
    //         new RendererStyle(200),
    //         new ImagickImageBackEnd()
    //     ));

    //     $data = $bacon->writeString(
    //         (new Google2FA)->getQRCodeUrl(
    //             config('app.name'),
    //             $user->email,
    //             $user->token
    //         ), 'utf-8');

    //     return 'data:image/png;base64,' . base64_encode($data);
    // }


    // public function login2FA(Request $request, User $user)
    // {
    //     $request->validate(['code_verification' => 'required']);

    //     if ((new Google2FA())->verifyKey($user->token, $request->code_verification)) {
    //         $request->session()->regenerate();

    //         Auth::login($user);

    //         return redirect()->intended($this->redirectPath());
    //     }

    //     return redirect()->back()->withErrors(['error'=> 'Código de verificación incorrecto']);
    // }
}
