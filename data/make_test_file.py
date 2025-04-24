# 定义文件总大小为 512M + 2
file_size = 3 * (64 * 16 ) 
# 定义每次写入的块大小为 10MB（10MB = 10 * 1024 * 1024 字节）
chunk_size = 2 * 1024 * 1024
# 定义最后 16 个字符
last_16_chars = "liaoyiao" * 2
# 计算除去最后 16 个字符后需要写入的总字节数
remaining_size = file_size - len(last_16_chars.encode())
# 生成 10MB 的填充内容（使用字符 'a'）
chunk = 'a' * chunk_size

# 指定文件路径
file_path = "3k_file.txt"

try:
    with open(file_path, 'w', encoding='utf-8') as file:
        # 循环写入数据块
        while remaining_size > chunk_size:
            file.write(chunk)
            remaining_size -= chunk_size

        # 处理剩余不足 10MB 的数据
        remaining_chunk = 'a' * remaining_size
        file.write(remaining_chunk)

        # 写入最后 16 个字符
        file.write(last_16_chars)

    print(f"文件 {file_path} 创建成功。")
except Exception as e:
    print(f"创建文件时出错: {e}")
    