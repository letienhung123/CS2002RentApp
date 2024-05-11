export function timeSince(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
    let interval = seconds / 31536000;  // Số giây trong một năm
    if (interval > 1) {
        return Math.floor(interval) + " năm trước";
    }
    interval = seconds / 2592000;  // Số giây trong một tháng
    if (interval > 1) {
        return Math.floor(interval) + " tháng trước";
    }
    interval = seconds / 86400;  // Số giây trong một ngày
    if (interval > 1) {
        return Math.floor(interval) + " ngày trước";
    }
    interval = seconds / 3600;  // Số giây trong một giờ
    if (interval > 1) {
        return Math.floor(interval) + " giờ trước";
    }
    interval = seconds / 60;  // Số giây trong một phút
    if (interval > 1) {
        return Math.floor(interval) + " phút trước";
    }
    return Math.floor(seconds) + " giây trước";
}
