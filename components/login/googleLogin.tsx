import { Text } from '~/components/ui/text';
import { Button } from '../ui/button';
import { ImageBox } from '../ui/imageBox';
import images from '~/constants/images';
import { supabase } from '~/utils/supabase';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

type Props = {};

export function GoogleLogin(props: Props) {
  // GoogleSignin.configure({
  //   scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  //   webClientId: '619236170667-lo8dd9v1uhfkgqgq95lefrg1ok7mld4g.apps.googleusercontent.com',
  // });
  GoogleSignin.configure({
    webClientId: '619236170667-lo8dd9v1uhfkgqgq95lefrg1ok7mld4g.apps.googleusercontent.com',
  });

  const loginGoogle = async () => {
    // const { data, error } = await supabase.auth.signInWithOAuth({
    //   provider: 'google',
    //   options: {
    //     queryParams: {
    //       access_type: 'offline',
    //       prompt: 'consent',
    //     },
    //   },
    // });
    // console.log('aaaa  ', data);
    // if (data) alert('로그인 되었습니다');
    // if (error) console.log('errrr   ', error);

    try {
      await GoogleSignin.hasPlayServices();
      console.log('000000');
      const userInfo = await GoogleSignin.signIn();

      console.log('11111   ', userInfo);
      if (userInfo?.data !== null && userInfo?.data.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.data.idToken,
        });
        console.log(error, data);
      } else {
        throw new Error('no ID token present!');
      }
    } catch (error: any) {
      console.log('eeee  ', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <Button
      variant={'outline'}
      className='mb-[8px] flex h-[52px] flex-row border-[#F1F1F5] bg-[#F1F1F5]'
      onPress={loginGoogle}>
      <ImageBox source={images.icon_google} className='mr-1 h-[20px] w-[20px]' />
      <Text className='text-[#505050]'>구글로 시작하기</Text>
    </Button>
  );
  // return (
  //   <GoogleSigninButton
  //     size={GoogleSigninButton.Size.Wide}
  //     color={GoogleSigninButton.Color.Dark}
  //     onPress={async () => {
  //       try {
  //         await GoogleSignin.hasPlayServices();
  //         const userInfo = await GoogleSignin.signIn();
  //         if (userInfo?.data !== null && userInfo.data.idToken) {
  //           const { data, error } = await supabase.auth.signInWithIdToken({
  //             provider: 'google',
  //             token: userInfo.data.idToken,
  //           });
  //           console.log(error, data);
  //         } else {
  //           throw new Error('no ID token present!');
  //         }
  //       } catch (error: any) {
  //         console.log('eeee  ', error);
  //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //           // user cancelled the login flow
  //         } else if (error.code === statusCodes.IN_PROGRESS) {
  //           // operation (e.g. sign in) is in progress already
  //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //           // play services not available or outdated
  //         } else {
  //           // some other error happened
  //         }
  //       }
  //     }}
  //   />
  // );
}

// export function GoogleLogin() {

// return (
//   <Button
//     variant={'outline'}
//     className='mb-[8px] flex h-[52px] flex-row border-[#F1F1F5] bg-[#F1F1F5]'
//     onPress={loginGoogle}>
//     <ImageBox source={images.icon_google} className='mr-1 h-[20px] w-[20px]' />
//     <Text className='text-[#505050]'>구글로 시작하기</Text>
//   </Button>
// );
