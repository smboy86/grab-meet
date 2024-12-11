import { Text } from '~/components/ui/text';
import { Button } from '../ui/button';
import { ImageBox } from '../ui/imageBox';
import images from '~/constants/images';
import { supabase } from '~/utils/supabase';
import { login } from '@react-native-kakao/user';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {};

export function KakaoLogin(props: Props) {
  const router = useRouter();

  const loginKakao = async () => {
    // 1) 카카오 로그인
    // 1-1) 성공한 idToken 값 획득
    // 2) 수파베이스 idToken 연동
    // 2-1) 수파베이스 인증에 성공
    try {
      login()
        .then(async (result) => {
          // {"accessToken": "KHFdvlFA-4BzlFBeYohhCySVMfnCJf_EAAAAAQoqJVEAAAGTc6LVf041iD77kjRL", "accessTokenExpiresAt": 1732855070, "accessTokenExpiresIn": 43198, "idToken": "eyJraWQiOiI5ZjI1MmRhZGQ1ZjIzM2Y5M2QyZmE1MjhkMTJmZWEiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJkZDRkYmI3Nzk5MjdjYTRmYzU2MDE3NDFlMDAwMjRjMiIsInN1YiI6IjM4MTE4NTM1NTMiLCJhdXRoX3RpbWUiOjE3MzI4MTE4NzEsImlzcyI6Imh0dHBzOi8va2F1dGgua2FrYW8uY29tIiwibmlja25hbWUiOiLsjb3rr7wiLCJleHAiOjE3MzI4NTUwNzEsImlhdCI6MTczMjgxMTg3MSwicGljdHVyZSI6Imh0dHBzOi8vay5rYWthb2Nkbi5uZXQvZG4vYlRaTUExL2J0c0VobVF2VEt0L3NERFljVGJQOWI0ZVNEaHB6emZlOWsvaW1nXzExMHgxMTAuanBnIn0.elJ0SY6e9X0bnbUYIcqDtR6szEwK2ZEXgEo4a7nCesSMY9Y-2WUN9pkaXymOpnkbbcAwejFYWYENSVEJIBeuqdBpEFej7OqdYcgYkcS537M7DqGefVgEvniRIQngQioCDUFAKFxDI0RXvAgmWgj3Yjk9t2fT2jw7QqUzWvTjOQjAWZAu10tOayapR0XwB1-OBkssvSscZN-v1xykQnhhGKXC8cL9OMHAsBHAM8SH1VWNCP-RGkhCPnbIrVQ8J_4J1fJBAhTULyXD9u6xXTVEEUF46GQjc8GtJYCduiKbJeZ41wCFsPA8y0Y6D5Ec122kJe8KMKvPdAYjE8zo-ndRhg", "refreshToken": "VAOttrHyV_5qJJKJsAwTDlQb5_qWI68AAAAAAgoqJVEAAAGTc6LVe041iD77kjRL", "refreshTokenExpiresAt": 1737995870, "refreshTokenExpiresIn": 5183998, "scopes": ["profile_image", "profile_nickname"], "tokenType": null}
          // console.log('카카오 로그인 성공 ~~  ', result.idToken, result);
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'kakao',
            token: result.idToken ?? '',
          });

          if (error) console.log('errrr   ', error);
          if (data) {
            Alert.alert('그랩밋', '로그인 되었습니다.');
            router.replace('/(main)');
          }

          // console.log('수파베이스 연동 ~ 111 ', data);
          // >> {"session": {"access_token": "eyJhbGciOiJIUzI1NiIsImtpZCI6IjFpYTQrNEY2aTdZcXBMS2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2RobGZlemRtY25vZHp3cmVxenJqLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI5NGE3OTI0ZS0xMjA5LTRjMmEtOWNmZi0yM2EwMzUwMTM3YTciLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzMyODE3NTkyLCJpYXQiOjE3MzI4MTM5OTIsImVtYWlsIjoic21ib3k4NkBuYXZlci5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6Imtha2FvIiwicHJvdmlkZXJzIjpbImtha2FvIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsIjoic21ib3k4NkBuYXZlci5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9rYXV0aC5rYWthby5jb20iLCJuYW1lIjoi7I2966-8IiwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJwaWN0dXJlIjoiaHR0cHM6Ly9rLmtha2FvY2RuLm5ldC9kbi9iVFpNQTEvYnRzRWhtUXZUS3Qvc0REWWNUYlA5YjRlU0RocHp6ZmU5ay9pbWdfMTEweDExMC5qcGciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiLsjb3rr7wiLCJwcm92aWRlcl9pZCI6IjM4MTE4NTM1NTMiLCJzdWIiOiIzODExODUzNTUzIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib2F1dGgiLCJ0aW1lc3RhbXAiOjE3MzI4MTM5OTJ9XSwic2Vzc2lvbl9pZCI6IjZmZTRkYjBhLWVjNjMtNDI3Zi1iOWI4LWVjMzc2NjJmMTgzNSIsImlzX2Fub255bW91cyI6ZmFsc2V9.vdYXG3_MTIsf3MxT18r--xkgx1eZUjucaFzj6ibWl_s", "expires_at": 1732817592, "expires_in": 3600, "refresh_token": "_d4hUzDU_nS16ZtWAYVHPw", "token_type": "bearer", "user": {"app_metadata": [Object], "aud": "authenticated", "confirmed_at": "2024-11-28T17:03:38.17015Z", "created_at": "2024-11-28T17:03:38.161785Z", "email": "smboy86@naver.com", "email_confirmed_at": "2024-11-28T17:03:38.17015Z", "id": "94a7924e-1209-4c2a-9cff-23a0350137a7", "identities": [Array], "is_anonymous": false, "last_sign_in_at": "2024-11-28T17:13:12.49096173Z", "phone": "", "role": "authenticated", "updated_at": "2024-11-28T17:13:12.49369Z", "user_metadata": [Object]}}, "user": {"app_metadata": {"provider": "kakao", "providers": [Array]}, "aud": "authenticated", "confirmed_at": "2024-11-28T17:03:38.17015Z", "created_at": "2024-11-28T17:03:38.161785Z", "email": "smboy86@naver.com", "email_confirmed_at": "2024-11-28T17:03:38.17015Z", "id": "94a7924e-1209-4c2a-9cff-23a0350137a7", "identities": [[Object]], "is_anonymous": false, "last_sign_in_at": "2024-11-28T17:13:12.49096173Z", "phone": "", "role": "authenticated", "updated_at": "2024-11-28T17:13:12.49369Z", "user_metadata": {"email": "smboy86@naver.com", "email_verified": true, "iss": "https://kauth.kakao.com", "name": "썽민", "phone_verified": false, "picture": "https://k.kakaocdn.net/dn/bTZMA1/btsEhmQvTKt/sDDYcTbP9b4eSDhpzzfe9k/img_110x110.jpg", "preferred_username": "썽민", "provider_id": "3811853553", "sub": "3811853553"}}}
          // console.log('수파베이스 연동 ~ 222 ', error);
        })
        .catch((e) => {
          console.log('k errrrr  ', e);
          alert(JSON.stringify(e));
        });
    } catch (e) {
      console.log('errr  ');
      alert(JSON.stringify(e));
    }
  };

  return (
    <>
      <Button
        className='mb-[8px] flex h-[52px] flex-row border-[#F1F1F5] bg-[#F1F1F5]'
        size={'base'}
        onPress={loginKakao}>
        <ImageBox source={images.icon_kakao} className='mr-1 h-[20px] w-[20px]' />
        <Text className='text-[#505050]'>카카오로 시작하기</Text>
      </Button>
      {/* <Button
        className='mb-[8px] flex h-[52px] flex-row border-[#F1F1F5] bg-[#F1F1F5]'
        size={'base'}
        onPress={async () => {
          console.log('00000');
          // const ttt = await logout();
          const ttt = await unlink();
          console.log('11111', ttt);
        }}>
        <ImageBox source={images.icon_kakao} className='mr-1 h-[20px] w-[20px]' />
        <Text className='text-[#505050]'>로그아웃</Text>
      </Button> */}
    </>
  );
}
