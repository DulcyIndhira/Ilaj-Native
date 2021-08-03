import qs from 'qs';
import { Linking } from 'react-native';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';
const fetchFonts = () => {
  return Font.loadAsync({
  'cera-pro': require('../../assets/fonts/CeraPro-Medium.ttf'),
  'ceraprolight': require('../../assets/fonts/FontsFree-Net-cor2.ttf'),
  'cerapromedium': require('../../assets/fonts/FontsFree-Net-cor3.ttf')
  });
  };
export async function SendEmail(to, subject, body, options = {}) {
    const { cc, bcc } = options;

    let url = `mailto:${to}`;

    // Create email link query
    const query = qs.stringify({
        subject: subject,
        body: body,
        cc: cc,
        bcc: bcc
    });

    if (query.length) {
        url += `?${query}`;
    }

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
        throw new Error('Provided URL can not be handled');
    }

    return Linking.openURL(url);
}
