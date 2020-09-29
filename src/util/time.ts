import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

export function getFormatTime(timeStamp: number): string {
  const time = dayjs(timeStamp);
  const now = dayjs(new Date());
  //输出差距时间
  if (now.diff(time, 'day') <= 2) {
    return time.fromNow();
  } else if (now.get('year') - time.get('year') == 0) return time.format('M月D日');
  else {
    return time.format('YYYY年M月D日');
  }
}
