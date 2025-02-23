

异步编程通过asyncio库实现。

如下是一个异步任务的示例。

```Python
import asyncio

async def task_one():
    print("开始执行任务一")
    await asyncio.sleep(3)  # 模拟一个耗时的操作
    print("任务一执行完成")

async def task_two():
    print("任务二")

async def main():
    task1 = asyncio.create_task(task_one())
    task2 = asyncio.create_task(task_two())
    await task1
    await task2

asyncio.run(main())
```

输出结果如下：

```
开始执行任务一
任务二
任务一执行完成
```

可以发现，任务一中有一个耗时操作，但是任务二这个不耗时的操作在前面打印出来了。