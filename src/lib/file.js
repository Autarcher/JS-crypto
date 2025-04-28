import SparkMD5 from 'spark-md5';

// 计算整个文件的MD5
export async function calculateFileMd5(file, chunkSize = 1 * 1024 * 1024) {
  const spark = new SparkMD5.ArrayBuffer();
  const reader = new FileReader();
  let offset = 0;

  while (offset < file.size) {
    const chunk = file.slice(offset, offset + chunkSize);

    const data = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('读取文件失败'));
      reader.readAsArrayBuffer(chunk);
    });

    spark.append(data);
    offset += chunkSize;
  }

  return spark.end(); // 返回 MD5 字符串
}
