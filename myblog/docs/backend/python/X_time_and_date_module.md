# 模块-日期和时间模块


[[toc]]

## `calendar`模块

查看`calendar`模块有哪些函数或方法：

```py
$ python                                                                                              
Python 3.6.8 (tags/v3.6.8:3c6b436a57, Dec 24 2018, 00:16:47) [MSC v.1916 64 bit (AMD64)] on win32     
Type "help", "copyright", "credits" or "license" for more information.                                
>>> import calendar                                                                                   
>>> calendar.                                                                                         
calendar.Calendar(            calendar.WEDNESDAY            calendar.month_abbr                       
calendar.EPOCH                calendar.c                    calendar.month_name                       
calendar.FRIDAY               calendar.calendar(            calendar.monthcalendar(                   
calendar.February             calendar.datetime             calendar.monthrange(                      
calendar.HTMLCalendar(        calendar.day_abbr             calendar.prcal(                           
calendar.IllegalMonthError(   calendar.day_name             calendar.prmonth(                         
calendar.IllegalWeekdayError( calendar.different_locale(    calendar.prweek(                          
calendar.January              calendar.error(               calendar.repeat(                          
calendar.LocaleHTMLCalendar(  calendar.firstweekday(        calendar.setfirstweekday(                 
calendar.LocaleTextCalendar(  calendar.format(              calendar.sys                              
calendar.MONDAY               calendar.formatstring(        calendar.timegm(                          
calendar.SATURDAY             calendar.isleap(              calendar.week(                            
calendar.SUNDAY               calendar.leapdays(            calendar.weekday(                         
calendar.THURSDAY             calendar.main(                calendar.weekheader(                      
calendar.TUESDAY              calendar.mdays                                                          
calendar.TextCalendar(        calendar.month(                                                         
>>> calendar.                                                                                         
```

### 周一到周日

看源码可知`(MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY) = range(7)`，可知周一到周日是以数字0、1、2、3、4、5、6表示的。

```py
>>> calendar.MONDAY       
0                         
                          
>>> calendar.TUESDAY      
1                         
                          
>>> calendar.WEDNESDAY    
2                         
                          
>>> calendar.THURSDAY     
3                         
                          
>>> calendar.FRIDAY       
4                         
                          
>>> calendar.SATURDAY     
5                         
                          
>>> calendar.SUNDAY       
6                         
                          
>>>                       
```

### 每周的第一天

`calendar`默认将周一作为每周的第一天，你可以使用`setfirstweekday(weekday)`和`firstweekday()`来分别设置和获取每周的第一天：


```py
# 获取当前每周第一天
>>> calendar.firstweekday()
0

# 设置每周第一天为周日
>>> calendar.setfirstweekday(6)

# 获取当前每周第一天
>>> calendar.firstweekday()
6

# 设置每周第一天为周日
>>> calendar.setfirstweekday(calendar.SUNDAY)

# 获取当前每周第一天
>>> calendar.firstweekday()
6
```

### 闰年判断

使用`calendar.isleap(year)`判断年份`year`是否为闰年，是闰年时返回`True`，否则返回`False`：

```sh
>>> calendar.isleap?
Signature: calendar.isleap(year)
Docstring: Return True for leap years, False for non-leap years.
File:      d:\programfiles\python368\lib\calendar.py
Type:      function

# 2020年是闰年
>>> calendar.isleap(2020)
True

# 2000年也是闰年
>>> calendar.isleap(2000)
True

>>> calendar.isleap(1900)
False

>>> calendar.isleap(2021)
False
```


### 两个年份之间有多少个闰年

使用`calendar.leapdays(y1, y2)`获取两个年份之间有多少个闰年，包含`y1`年份，不包含`y2`年份，源码中并没有判断`y1`年份必须比`y2`年份小：

```py
>>> calendar.leapdays(1900,2020)
29

>>> calendar.leapdays(1900, 2021)
30

>>> calendar.leapdays(2000, 2020)
5

>>> calendar.leapdays(2000, 2021)
6

>>> calendar.leapdays(2020, 2000)
-5

>>> calendar.leapdays(2019, 2020)
0

>>> calendar.leapdays(2020, 2020)
0

>>> calendar.leapdays(2020, 2021)
1
```


### 指定日期为周几

```calendar.weekday(year, month, day)```可以获取指定日期是周几：

```py
# 2020年5月23日是周六
>>> calendar.weekday(2020, 5, 23)
5

# 2020年5月22日是周五
>>> calendar.weekday(2020, 5, 22)
4

>>> calendar.weekday(2020, 5, 21)
3

>>> calendar.weekday(2020, 5, 20)
2

>>> calendar.weekday(2020, 5, 19)
1

>>> calendar.weekday(2020, 5, 18)
0

>>> calendar.weekday(2020, 5, 17)
6

>>> calendar.weekday(1900, 5, 17)
3

# 年份不能是负数或0
>>> calendar.weekday(-1900, 5, 17)
---------------------------------------------------------------------------
ValueError                                Traceback (most recent call last)
<ipython-input-48-9594fb810542> in <module>
----> 1 calendar.weekday(-1900, 5, 17)

d:\programfiles\python368\lib\calendar.py in weekday(year, month, day)
    114     """Return weekday (0-6 ~ Mon-Sun) for year (1970-...), month (1-12),
    115        day (1-31)."""
--> 116     return datetime.date(year, month, day).weekday()
    117
    118

ValueError: year -1900 is out of range

>>> calendar.weekday(0, 5, 23)
---------------------------------------------------------------------------
ValueError                                Traceback (most recent call last)
<ipython-input-59-43ee5afa490e> in <module>
----> 1 calendar.weekday(0, 5, 23)

d:\programfiles\python368\lib\calendar.py in weekday(year, month, day)
    114     """Return weekday (0-6 ~ Mon-Sun) for year (1970-...), month (1-12),
    115        day (1-31)."""
--> 116     return datetime.date(year, month, day).weekday()
    117
    118

ValueError: year 0 is out of range
```


### 返回包含英文星期缩写的字符

`calendar.weekheader(n)`可以返回包含英文星期缩写的字符，`n`指定周一至周日英文字符的宽度：
```py
# 因为上面我们设置了每周第一天为周日，所以开始显示是Sun周日
>>> calendar.weekheader(3)
'Sun Mon Tue Wed Thu Fri Sat'

>>> calendar.weekheader(4)
'Sun  Mon  Tue  Wed  Thu  Fri  Sat '

>>> calendar.weekheader(5)
' Sun   Mon   Tue   Wed   Thu   Fri   Sat '

>>> calendar.weekheader(2)
'Su Mo Tu We Th Fr Sa'

>>> calendar.weekheader(1)
'S M T W T F S'

# 重新设置每周第一天为周一
>>> calendar.setfirstweekday(calendar.MONDAY)

# 此时可以看到Mon周一显示在前面
>>> calendar.weekheader(3)
'Mon Tue Wed Thu Fri Sat Sun'

>>> calendar.weekheader(4)
'Mon  Tue  Wed  Thu  Fri  Sat  Sun '

>>> calendar.weekheader(5)
' Mon   Tue   Wed   Thu   Fri   Sat   Sun '

>>> calendar.weekheader(2)
'Mo Tu We Th Fr Sa Su'

>>> calendar.weekheader(1)
'M T W T F S S'
```

### 月份的第一天是周几，月份有多少天

`calendar.monthrange(year, month)`可以返回指定月份的第一天是周几，以及该月的天数。

```py
>>> calendar.monthrange?
Signature: calendar.monthrange(year, month)
Docstring:
Return weekday (0-6 ~ Mon-Sun) and number of days (28-31) for
year, month.
File:      d:\programfiles\python368\lib\calendar.py
Type:      function

# 2020年5月第一天是周五，该月共31天
>>> calendar.monthrange(2020, 5)
(4, 31)

# 2020年4月第一天是周三，该月共30天
>>> calendar.monthrange(2020, 4)
(2, 30)

>>> calendar.monthrange(2020, 3)
(6, 31)

>>> calendar.monthrange(2020, 2)
(5, 29)

>>> calendar.monthrange(2020, 1)
(2, 31)
```

### 指定月份的日历列表

`calendar.monthcalendar(year, month)`可以返回指定月份的列表，每行代表一个星期，该月份以外的日期以0替代，默认以周一作为每周的第一天：

```py
>>> calendar.monthcalendar(2020, 5)
[[0, 0, 0, 0, 1, 2, 3],
 [4, 5, 6, 7, 8, 9, 10],
 [11, 12, 13, 14, 15, 16, 17],
 [18, 19, 20, 21, 22, 23, 24],
 [25, 26, 27, 28, 29, 30, 31]]

>>> calendar.monthcalendar(2020, 4)
[[0, 0, 1, 2, 3, 4, 5],
 [6, 7, 8, 9, 10, 11, 12],
 [13, 14, 15, 16, 17, 18, 19],
 [20, 21, 22, 23, 24, 25, 26],
 [27, 28, 29, 30, 0, 0, 0]]

>>> calendar.monthcalendar(2020, 3)
[[0, 0, 0, 0, 0, 0, 1],
 [2, 3, 4, 5, 6, 7, 8],
 [9, 10, 11, 12, 13, 14, 15],
 [16, 17, 18, 19, 20, 21, 22],
 [23, 24, 25, 26, 27, 28, 29],
 [30, 31, 0, 0, 0, 0, 0]]

>>> calendar.monthcalendar(2020, 2)
[[0, 0, 0, 0, 0, 1, 2],
 [3, 4, 5, 6, 7, 8, 9],
 [10, 11, 12, 13, 14, 15, 16],
 [17, 18, 19, 20, 21, 22, 23],
 [24, 25, 26, 27, 28, 29, 0]]

>>> calendar.monthcalendar(2020, 1)
[[0, 0, 1, 2, 3, 4, 5],
 [6, 7, 8, 9, 10, 11, 12],
 [13, 14, 15, 16, 17, 18, 19],
 [20, 21, 22, 23, 24, 25, 26],
 [27, 28, 29, 30, 31, 0, 0]]
```


### 打印指定月份的日历

`calendar.prmonth(theyear, themonth, w=0, l=0)`可以打印指定月份的日历，`w`指定星期字符的宽度，默认为0，内部限制至少为2; `l`指定两周之间换几行，默认值为0，内部限制至少换1行，实验可以发现`l`参数保持默认比较好，看起来比较紧凑：

```py
>>> calendar.prmonth?
Signature: calendar.prmonth(theyear, themonth, w=0, l=0)
Docstring: Print a month's calendar.
File:      d:\programfiles\python368\lib\calendar.py
Type:      method

# 默认星期字符宽度为2
>>> calendar.prmonth(2020, 5)
      May 2020
Mo Tu We Th Fr Sa Su
             1  2  3
 4  5  6  7  8  9 10
11 12 13 14 15 16 17
18 19 20 21 22 23 24
25 26 27 28 29 30 31

>>> calendar.prmonth(2020, 4)
     April 2020
Mo Tu We Th Fr Sa Su
       1  2  3  4  5
 6  7  8  9 10 11 12
13 14 15 16 17 18 19
20 21 22 23 24 25 26
27 28 29 30

>>> calendar.prmonth(2020, 3)
     March 2020
Mo Tu We Th Fr Sa Su
                   1
 2  3  4  5  6  7  8
 9 10 11 12 13 14 15
16 17 18 19 20 21 22
23 24 25 26 27 28 29
30 31

# 设置星期字符宽度为3
>>> calendar.prmonth(2020, 5, w=3)
          May 2020
Mon Tue Wed Thu Fri Sat Sun
                  1   2   3
  4   5   6   7   8   9  10
 11  12  13  14  15  16  17
 18  19  20  21  22  23  24
 25  26  27  28  29  30  31

# 设置星期字符宽度为4
>>> calendar.prmonth(2020, 5, w=4)
             May 2020
Mon  Tue  Wed  Thu  Fri  Sat  Sun
                      1    2    3
  4    5    6    7    8    9   10
 11   12   13   14   15   16   17
 18   19   20   21   22   23   24
 25   26   27   28   29   30   31

# 设置星期字符宽度为2
>>> calendar.prmonth(2020, 5, w=2)
      May 2020
Mo Tu We Th Fr Sa Su
             1  2  3
 4  5  6  7  8  9 10
11 12 13 14 15 16 17
18 19 20 21 22 23 24
25 26 27 28 29 30 31

# 设置星期字符宽度为1时，不起作用，还是保持为宽度为2
>>> calendar.prmonth(2020, 5, w=1)
      May 2020
Mo Tu We Th Fr Sa Su
             1  2  3
 4  5  6  7  8  9 10
11 12 13 14 15 16 17
18 19 20 21 22 23 24
25 26 27 28 29 30 31

# 设置两周之间换1行
>>> calendar.prmonth(2020, 5, l=1)
      May 2020
Mo Tu We Th Fr Sa Su
             1  2  3
 4  5  6  7  8  9 10
11 12 13 14 15 16 17
18 19 20 21 22 23 24
25 26 27 28 29 30 31

# 设置两周之间换2行
>>> calendar.prmonth(2020, 5, l=2)
      May 2020

Mo Tu We Th Fr Sa Su

             1  2  3

 4  5  6  7  8  9 10

11 12 13 14 15 16 17

18 19 20 21 22 23 24

25 26 27 28 29 30 31

# 设置两周之间换3行
>>> calendar.prmonth(2020, 5, l=3)
      May 2020


Mo Tu We Th Fr Sa Su


             1  2  3


 4  5  6  7  8  9 10


11 12 13 14 15 16 17


18 19 20 21 22 23 24


25 26 27 28 29 30 31



>>>
```

### 返回指定月份的多行文本字符串

`calendar.month(theyear, themonth, w=0, l=0)`可以返回指定月份的多行文本字符串，与`calendar.prmonth(theyear, themonth, w=0, l=0)`设置类似，可以理解为`calendar.prmonth`将`calendar.month`的返回值打印出来了：

```py
>>> calendar.month(2020, 5)
'      May 2020\nMo Tu We Th Fr Sa Su\n             1  2  3\n 4  5  6  7  8  9 10\n11 12 13 14 15 16 17\n18 19 20 21 22
23 24\n25 26 27 28 29 30 31\n'

>>> calendar.month(2020, 5, w=3)
'          May 2020\nMon Tue Wed Thu Fri Sat Sun\n                  1   2   3\n  4   5   6   7   8   9  10\n 11  12  13
 14  15  16  17\n 18  19  20  21  22  23  24\n 25  26  27  28  29  30  31\n'

>>> calendar.month(2020, 5, l=2)
'      May 2020\n\nMo Tu We Th Fr Sa Su\n\n             1  2  3\n\n 4  5  6  7  8  9 10\n\n11 12 13 14 15 16 17\n\n18 19
 20 21 22 23 24\n\n25 26 27 28 29 30 31\n\n'

>>> print(calendar.month(2020, 5, l=2))
      May 2020

Mo Tu We Th Fr Sa Su

             1  2  3

 4  5  6  7  8  9 10

11 12 13 14 15 16 17

18 19 20 21 22 23 24

25 26 27 28 29 30 31



>>>
```

### 打印指定年份的日历

`calendar.prcal(year, w=0, l=0, c=6, m=3)`打印指定年份的日历，`w`指定星期宽度，`l`指定换行，与上面的`prmonth`配置相同，`c`指定两列月份之间的空隔距离，`m`指定日历中显示几列月份

```py
>>> calendar.prcal?
Signature: calendar.prcal(theyear, w=0, l=0, c=6, m=3)
Docstring: Print a year's calendar.
File:      d:\programfiles\python368\lib\calendar.py
Type:      method

# 默认显示三列月份，两个月份之间空6格
>>> calendar.prcal(2020)
                                  2020

      January                   February                   March
Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su
       1  2  3  4  5                      1  2                         1
 6  7  8  9 10 11 12       3  4  5  6  7  8  9       2  3  4  5  6  7  8
13 14 15 16 17 18 19      10 11 12 13 14 15 16       9 10 11 12 13 14 15
20 21 22 23 24 25 26      17 18 19 20 21 22 23      16 17 18 19 20 21 22
27 28 29 30 31            24 25 26 27 28 29         23 24 25 26 27 28 29
                                                    30 31

       April                      May                       June
Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su
       1  2  3  4  5                   1  2  3       1  2  3  4  5  6  7
 6  7  8  9 10 11 12       4  5  6  7  8  9 10       8  9 10 11 12 13 14
13 14 15 16 17 18 19      11 12 13 14 15 16 17      15 16 17 18 19 20 21
20 21 22 23 24 25 26      18 19 20 21 22 23 24      22 23 24 25 26 27 28
27 28 29 30               25 26 27 28 29 30 31      29 30

        July                     August                  September
Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su
       1  2  3  4  5                      1  2          1  2  3  4  5  6
 6  7  8  9 10 11 12       3  4  5  6  7  8  9       7  8  9 10 11 12 13
13 14 15 16 17 18 19      10 11 12 13 14 15 16      14 15 16 17 18 19 20
20 21 22 23 24 25 26      17 18 19 20 21 22 23      21 22 23 24 25 26 27
27 28 29 30 31            24 25 26 27 28 29 30      28 29 30
                          31

      October                   November                  December
Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su
          1  2  3  4                         1          1  2  3  4  5  6
 5  6  7  8  9 10 11       2  3  4  5  6  7  8       7  8  9 10 11 12 13
12 13 14 15 16 17 18       9 10 11 12 13 14 15      14 15 16 17 18 19 20
19 20 21 22 23 24 25      16 17 18 19 20 21 22      21 22 23 24 25 26 27
26 27 28 29 30 31         23 24 25 26 27 28 29      28 29 30 31
                          30

# 设置月份之间空3格，按4列显示月份
>>> calendar.prcal(2020, c=3, m=4)
                                           2020

      January                February                March                  April
Mo Tu We Th Fr Sa Su   Mo Tu We Th Fr Sa Su   Mo Tu We Th Fr Sa Su   Mo Tu We Th Fr Sa Su
       1  2  3  4  5                   1  2                      1          1  2  3  4  5
 6  7  8  9 10 11 12    3  4  5  6  7  8  9    2  3  4  5  6  7  8    6  7  8  9 10 11 12
13 14 15 16 17 18 19   10 11 12 13 14 15 16    9 10 11 12 13 14 15   13 14 15 16 17 18 19
20 21 22 23 24 25 26   17 18 19 20 21 22 23   16 17 18 19 20 21 22   20 21 22 23 24 25 26
27 28 29 30 31         24 25 26 27 28 29      23 24 25 26 27 28 29   27 28 29 30
                                              30 31

        May                    June                   July                  August
Mo Tu We Th Fr Sa Su   Mo Tu We Th Fr Sa Su   Mo Tu We Th Fr Sa Su   Mo Tu We Th Fr Sa Su
             1  2  3    1  2  3  4  5  6  7          1  2  3  4  5                   1  2
 4  5  6  7  8  9 10    8  9 10 11 12 13 14    6  7  8  9 10 11 12    3  4  5  6  7  8  9
11 12 13 14 15 16 17   15 16 17 18 19 20 21   13 14 15 16 17 18 19   10 11 12 13 14 15 16
18 19 20 21 22 23 24   22 23 24 25 26 27 28   20 21 22 23 24 25 26   17 18 19 20 21 22 23
25 26 27 28 29 30 31   29 30                  27 28 29 30 31         24 25 26 27 28 29 30
                                                                     31

     September               October                November               December
Mo Tu We Th Fr Sa Su   Mo Tu We Th Fr Sa Su   Mo Tu We Th Fr Sa Su   Mo Tu We Th Fr Sa Su
    1  2  3  4  5  6             1  2  3  4                      1       1  2  3  4  5  6
 7  8  9 10 11 12 13    5  6  7  8  9 10 11    2  3  4  5  6  7  8    7  8  9 10 11 12 13
14 15 16 17 18 19 20   12 13 14 15 16 17 18    9 10 11 12 13 14 15   14 15 16 17 18 19 20
21 22 23 24 25 26 27   19 20 21 22 23 24 25   16 17 18 19 20 21 22   21 22 23 24 25 26 27
28 29 30               26 27 28 29 30 31      23 24 25 26 27 28 29   28 29 30 31
                                              30


>>>
```

### 返回年份日历的多行文本字符串

`calendar.calendar(year, w=2, l=1, c=6, m=3)`可以返回年份日历的多行文本字符串，参数与`calendar.prcal(year, w=0, l=0, c=6, m=3)`相同。

```py
>>> calendar.calendar(2020)
'                                  2020\n\n      January                   February                   March\nMo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su\n       1  2  3  4  5
              1  2                         1\n 6  7  8  9 10 11 12       3  4  5  6  7  8  9       2  3  4  5  6  7  8\n13 14 15 16 17 18 19      10 11 12 13 14 15 16       9 10 11 12 13 14 15\n20 21 22 23 24 25 26      17 18 19 20 21 22 23      16 17 18 19 20 21 22\n27 28 29 30 31            24 25 26 27 28 29         23 24 25 26 27 28 29\n                                                    30 31\n\n       April
               May                       June\nMo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su\n       1  2  3  4  5                   1  2  3       1  2  3  4  5  6  7\n 6  7  8  9 10 11 12       4  5  6  7  8  9 10       8  9 10 11 12 13 14\n13 14 15 16 17 18 19      11 12 13 14 15 16 17      15 16 17 18 19 20 21\n20 21 22 23 24 25 26      18 19 20 21 22 23 24      22 23 24 25 26 27 28\n27 28 29 30               25 26 27 28 29 30 31      29 30\n\n        July                     August                  September\nMo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su\n       1  2
3  4  5                      1  2          1  2  3  4  5  6\n 6  7  8  9 10 11 12       3  4  5  6  7  8  9       7  8  9 10 11 12 13\n13 14 15 16 17 18 19      10 11 12 13 14 15 16      14 15 16 17 18 19 20\n20 21 22 23 24 25 26      17 18 19 20 21 22 23      21 22 23 24 25 26 27\n27 28 29 30 31            24 25 26 27 28 29 30      28 29 30\n                          31\n\n      October                   November
             December\nMo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su\n          1  2  3  4                         1          1  2  3  4  5  6\n 5  6  7  8  9 10 11       2  3  4  5  6
  7  8       7  8  9 10 11 12 13\n12 13 14 15 16 17 18       9 10 11 12 13 14 15      14 15 16 17 18 19 20\n19 20 21 22 23 24 25      16 17 18 19 20 21 22      21 22 23 24 25 26 27\n26 27 28 29 30 31         23 24 25 26 27 28 29      28 29 30 31\n                          30\n'
```


### 获取时间戳值

`calendar.timegm(tuple)`是一个不相关但很方便的函数，`tuple`参数可以是由`time.gmtime()`函数返回的时间元组，返回相应的Unix时间戳值。实际上，`time.gmtime()`和`calendar.timegm()`功能正好相反。

```py
>>> calendar.timegm?
Signature: calendar.timegm(tuple)
Docstring: Unrelated but handy function to calculate Unix timestamp from GMT.
File:      d:\programfiles\python368\lib\calendar.py
Type:      function

>>> calendar.timegm((2020 ,2, 3, 12, 12, 20))
1580731940

>>> import time

>>> time.gmtime?
Docstring:
gmtime([seconds]) -> (tm_year, tm_mon, tm_mday, tm_hour, tm_min,
                       tm_sec, tm_wday, tm_yday, tm_isdst)

Convert seconds since the Epoch to a time tuple expressing UTC (a.k.a.
GMT).  When 'seconds' is not passed in, convert the current time instead.

If the platform supports the tm_gmtoff and tm_zone, they are available as
attributes only.
Type:      builtin_function_or_method

>>> time.gmtime()
time.struct_time(tm_year=2020, tm_mon=5, tm_mday=23, tm_hour=9, tm_min=16, tm_sec=24, tm_wday=5, tm_yday=144, tm_isdst=0)

>>> calendar.timegm(time.gmtime())
1590225405

>>> calendar.timegm(time.gmtime())
1590225416

>>> type(time.gmtime())
time.struct_time

>>> time.gmtime(calendar.timegm(time.gmtime()))
time.struct_time(tm_year=2020, tm_mon=5, tm_mday=23, tm_hour=9, tm_min=18, tm_sec=3, tm_wday=5, tm_yday=144, tm_isdst=0)

>>> time.gmtime(calendar.timegm(time.gmtime()))
time.struct_time(tm_year=2020, tm_mon=5, tm_mday=23, tm_hour=9, tm_min=18, tm_sec=29, tm_wday=5, tm_yday=144, tm_isdst=0)
```

### `calendar`日历模块的数据属性

- `calendar.day_name`: 当前语言环境下星期(每周的第一天到最后一天)组成的数组。
- `calendar.day_abbr`: 当前语言环境下星期(每周的第一天到最后一天)缩写组成的数组。
- `calendar.month_name`: 当前语言环境下一年中月份组成的数组，长度为13，第一个元素为空，是为了让`January`作为`1`号元素，与实际约定保持一致。
- `calendar.month_abbr`: 当前语言环境下一年中月份缩写组成的数组，长度为13，第一个元素为空，是为了让`January`作为`1`号元素，与实际约定保持一致。

```py
>>> calendar.day_name?
Type:        _localized_day
String form: <calendar._localized_day object at 0x000002C809329710>
Length:      7
File:        d:\programfiles\python368\lib\calendar.py
Docstring:   <no docstring>

>>> calendar.day_name
<calendar._localized_day at 0x2c809329710>

>>> calendar.day_abbr
<calendar._localized_day at 0x2c809329748>

>>> print(calendar.day_abbr)
<calendar._localized_day object at 0x000002C809329748>

>>> print(calendar.month_name)
<calendar._localized_month object at 0x000002C809329780>

>>> print(calendar.month_name[0])


>>> calendar.month_name[0]
''

>>> calendar.month_name[1]
'January'

>>> calendar.month_name[2]
'February'

>>> calendar.month_name[3]
'March'

>>> calendar.month_name[4]
'April'

>>> [i for i in calendar.day_name]
['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

>>> [i for i in calendar.day_abbr]
['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

>>> [i for i in calendar.month_name]
['',
 'January',
 'February',
 'March',
 'April',
 'May',
 'June',
 'July',
 'August',
 'September',
 'October',
 'November',
 'December']

>>> [i for i in calendar.month_abbr]
['',
 'Jan',
 'Feb',
 'Mar',
 'Apr',
 'May',
 'Jun',
 'Jul',
 'Aug',
 'Sep',
 'Oct',
 'Nov',
 'Dec']
```

### 设置locale本地化后获取日历模块数据属性

```py
>>> import locale

>>> locale?
Type:        module
String form: <module 'locale' from 'd:\\programfiles\\python368\\lib\\locale.py'>
File:        d:\programfiles\python368\lib\locale.py
Docstring:
Locale support module.

The module provides low-level access to the C lib's locale APIs and adds high
level number formatting APIs as well as a locale aliasing engine to complement
these.

The aliasing engine includes support for many commonly used locale names and
maps them to values suitable for passing to the C lib's setlocale() function. It
also includes default encodings for all supported locale names.

>>> locale.getlocale()
(None, None)

# 获取当前默认环境，当设置locale使用默认值时，此值会被采用为默认值。
>>> locale.getdefaultlocale()
('zh_CN', 'cp65001')

>>> locale.LC_ALL
0

>>> locale.getlocale()
(None, None)

# 设置为中文环境
>>> locale.setlocale(locale.LC_ALL, '')
'Chinese (Simplified)_China.utf8'

>>> locale.getlocale()
('Chinese (Simplified)_China', 'utf8')

>>> [i for i in calendar.day_name]
['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']

>>> [i for i in calendar.day_abbr]
['周一', '周二', '周三', '周四', '周五', '周六', '周日']

>>> [i for i in calendar.month_name]
['', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

>>> [i for i in calendar.month_abbr]
['', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

# 重新设置为英文环境
>>> locale.setlocale(locale.LC_ALL, 'C')
'C'

>>> locale.getlocale()
(None, None)

>>> [i for i in calendar.month_abbr]
['',
 'Jan',
 'Feb',
 'Mar',
 'Apr',
 'May',
 'Jun',
 'Jul',
 'Aug',
 'Sep',
 'Oct',
 'Nov',
 'Dec']

>>> [i for i in calendar.day_name]
['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

>>> [i for i in calendar.day_abbr]
['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

>>> [i for i in calendar.month_name]
['',
 'January',
 'February',
 'March',
 'April',
 'May',
 'June',
 'July',
 'August',
 'September',
 'October',
 'November',
 'December']

>>> [i for i in calendar.month_abbr]
['',
 'Jan',
 'Feb',
 'Mar',
 'Apr',
 'May',
 'Jun',
 'Jul',
 'Aug',
 'Sep',
 'Oct',
 'Nov',
 'Dec']

>>>
```
可以发现获取日历模块的数据属性时，根据当前语言环境不同，获取的结果是不一样的，相应的使用`calendar`模块其他函数或方法获取到的结果也可能会受语言环境影响，请注意此问题。

`calendar`模块中还定义了`calendar.Calendar`类，`calendar.TextCalendar`类，`calendar.HTMLCalendar`类，`calendar.LocaleTextCalendar`类以及`calendar.LocaleHTMLCalendar`类，此处不展开。详细可参考[https://docs.python.org/3.6/library/calendar.html](https://docs.python.org/3.6/library/calendar.html)

## `time`模块

查看`time`模块有哪些函数或方法：

```py
$ python
Python 3.6.8 (tags/v3.6.8:3c6b436a57, Dec 24 2018, 00:16:47) [MSC v.1916 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import time
>>> time.
time.altzone         time.clock(          time.daylight        time.gmtime(         time.mktime(         time.perf_counter(   time.sleep(          time.strptime(       time.time(           time.tzname
time.asctime(        time.ctime(          time.get_clock_info( time.localtime(      time.monotonic(      time.process_time(   time.strftime(       time.struct_time(    time.timezone
>>> exit()
```

此模块并非所有平台提供所有功能，因平台而异。

以下是对一些术语和惯例的解释：

- epoch纪元初始时间因平台而异。对于Unix平台，初始时间是`1970,01,01,00:00:00（UTC）`。查看每个操作平台的初始时间可以使用`time.gmtime(0)`函数。
- 在所有POSIX平台上，从初始时间以来的秒数都不包括闰秒。
- 该模块中的函数可能不处理纪元时间以前和遥远未来的日期和时间，未来的分界点对于32位操作系统是2038年。在大多数的UNIX系统中UNIX时间戳存储为32位，这样会引发2038年问题或Y2038。
- 千年虫问题：Python依赖于平台的C库，该库通常没有2000年问题，因为所有日期和时间在内部都以自该纪元以来的秒表示。给定`％y`格式代码时，函数`strptime()`可以解析两位数的年份。解析两位数的年份时，将根据POSIX和ISO C标准进行转换：将值`69-99`映射到`1969-1999`，将值`0-68`映射到`2000-2068`。
- UTC是协调世界时(以前称为格林尼治标准时间，GMT)。缩写UTC不是一个错误，而是英语和法语之间的妥协。
- DST是夏令时，在一年中的某些时候，时区通常会调整一个小时。DST规则是神奇的(由当地法律决定)，每年都在变化。
- 各种实时函数的精度可能低于表示其值或参数的单位所建议的精度。例如。在大多数Unix系统上，时钟每秒仅滴答50或100次。
- 整个世界分为24个时区，每个时区都有自己的本地时间，`UTC`协议世界时与英国伦敦的本地时相同。中国的北京时区位于东八区，领先UTC八个小时。`UTC + 时区差 = 本地时间`， 时区差东为正，西为负。因此，把东八区时区差记为`+0800`。

### 时间元组`struct_time`

`time.struct_time`类，是`gmtime`,`localtime()`和`strptime()`等函数返回的时间值序列的类型。它是具有命名元组接口的对象：可以通过索引和属性名称访问值。 存在以下值：

| 序号 | 属性         |      字段    | 值                          |
|-----|-------------|-------------|----------------------------|
| 0   | `tm_year`   | 4位数年      |  如`2020`                       |
| 1   | `tm_mon`    | 月          |  `1`到`12`                     |
| 2   | `tm_mday`   | 日          |  `1`到`31`                     |
| 3   | `tm_hour`   | 小时         |  `0`到`23`                     |
| 4   | `tm_min`    | 分钟        |   `0`到`59`                     |
| 5   | `tm_sec`    | 秒         | `0`到`61` (60或61是闰秒)       |
| 6   | `tm_wday`   | 一周的第几日  | `0`到`6` (0是周一)               |
| 7   | `tm_yday`   | 一年的第几日  | `1`到`366`             |
| 8   | `tm_isdst`  | 夏令时      |  `-1`, `0`, `1`, 是决定是否为夏令时的标志 |

### `time.asctime([t])`接受时间元组并返回一个可读的形式字符串

`time.asctime([t])`函数将表示由`gmtime()`或`localtime()`返回的时间的元组或`struct_time`转换为以下形式的字符串：`Sun Jun 20 23:21:05 1993`。 如果未提供`t`，则使用`localtime()`返回的当前时间。`asctime()`不使用语言环境信息。

::: tip 说明
`time.asctime([t])`函数返回默认不会加换行符。
:::

```py
>>> import time

>>> time.asctime?
Docstring:
asctime([tuple]) -> string

Convert a time tuple to a string, e.g. 'Sat Jun 06 16:26:11 1998'.
When the time tuple is not present, current time as returned by localtime()
is used.
Type:      builtin_function_or_method

>>> time.asctime()
'Sun May 24 22:37:11 2020'

>>> print('now time is: %s. this is no trailing endline' % time.asctime())
now time is: Wed May 24 22:38:36 2020. this is no trailing endline
```

### `time.clock()`获取处理器时间

`time.clock()`在Unix系统中可以获取处理器时间，在Windows系统中可以返回第一次调用该函数后经过的时间(以秒为单位)的浮点数。从版本3.3开始不推荐使用：此功能的行为取决于平台：请根据您的要求使用`perf_counter()`或`process_time()`来具有明确定义的行为。

```py
>>> time.clock()
1e-07

>>> time.clock()
15.5999267

>>> time.clock()
18.5321979

>>> time.clock()
19.6224457

>>> time.clock()
20.509851

>>> time.clock()
21.280692
```


### `time.localtime([secs])`获取当地时间的时间元组

`time.localtime([secs])`接收时间戳(1970纪元后经过的浮点秒数)并返回当地时间下的时间元组`t`，如果未指定`secs`，则使用`time.time()`获取当前时间。

```py
>>> time.localtime()
time.struct_time(tm_year=2020, tm_mon=5, tm_mday=26, tm_hour=8, tm_min=6, tm_sec=13, tm_wday=1, tm_yday=147, tm_isdst=0)

>>> time.localtime(time.time())
time.struct_time(tm_year=2020, tm_mon=5, tm_mday=26, tm_hour=8, tm_min=6, tm_sec=45, tm_wday=1, tm_yday=147, tm_isdst=0)

>>> time.localtime(0)
time.struct_time(tm_year=1970, tm_mon=1, tm_mday=1, tm_hour=8, tm_min=0, tm_sec=0, tm_wday=3, tm_yday=1, tm_isdst=0)
```

可以发现当`time.localtime(0)`时,`tm_hour=8`,这是因为参数0表示距离纪元的时间秒数，而本地时间为东8区，因此当UTC时间为0时，东8区的时间是8点。

### `time.ctime([secs])`将时间秒数转换成本地时间

`time.ctime([secs])`将自纪元以来的秒数转换为代表本地时间的字符串。等阶于`time.asctime(time.localtime())`:

```py
>>> time.ctime()
'Tue May 26 08:18:22 2020'

>>> time.asctime(time.localtime())
'Tue May 26 08:18:49 2020'
```


### `time.time()`获取纪元以来的时间秒数

`time.time()`获取纪元以来的时间秒数，可以通过`time.gmtime(0)`获取纪元开始时间。

```py
>>> time.time?
Docstring:
time() -> floating point number

Return the current time in seconds since the Epoch.
Fractions of a second may be present if the system clock provides them.
Type:      builtin_function_or_method

>>> time.time()
1590452682.4995768

>>> time.gmtime(0)
time.struct_time(tm_year=1970, tm_mon=1, tm_mday=1, tm_hour=0, tm_min=0, tm_sec=0, tm_wday=3, tm_yday=1, tm_isdst=0)
```

### `time.gmtime([secs])`获取时间戳的时间元组

```py
>>> time.gmtime?
Docstring:
gmtime([seconds]) -> (tm_year, tm_mon, tm_mday, tm_hour, tm_min,
                       tm_sec, tm_wday, tm_yday, tm_isdst)

Convert seconds since the Epoch to a time tuple expressing UTC (a.k.a.
GMT).  When 'seconds' is not passed in, convert the current time instead.

If the platform supports the tm_gmtoff and tm_zone, they are available as
attributes only.
Type:      builtin_function_or_method

>>> time.gmtime()
time.struct_time(tm_year=2020, tm_mon=5, tm_mday=26, tm_hour=0, tm_min=28, tm_sec=15, tm_wday=1, tm_yday=147, tm_isdst=
)

>>> time.gmtime(60)
time.struct_time(tm_year=1970, tm_mon=1, tm_mday=1, tm_hour=0, tm_min=1, tm_sec=0, tm_wday=3, tm_yday=1, tm_isdst=0)

>>> time.gmtime(3600)
time.struct_time(tm_year=1970, tm_mon=1, tm_mday=1, tm_hour=1, tm_min=0, tm_sec=0, tm_wday=3, tm_yday=1, tm_isdst=0)

>>> time.gmtime(36000)
time.struct_time(tm_year=1970, tm_mon=1, tm_mday=1, tm_hour=10, tm_min=0, tm_sec=0, tm_wday=3, tm_yday=1, tm_isdst=0)

>>>
```

### `time.mktime(t)`将时间元组转换成时间戳

```py
>>> time.mktime?
Docstring:
mktime(tuple) -> floating point number

Convert a time tuple in local time to seconds since the Epoch.
Note that mktime(gmtime(0)) will not generally return zero for most
time zones; instead the returned value will either be equal to that
of the timezone or altzone attributes on the time module.
Type:      builtin_function_or_method

>>> time.localtime()
time.struct_time(tm_year=2020, tm_mon=5, tm_mday=27, tm_hour=21, tm_min=58, tm_sec=18, tm_wday=2, tm_yday=148, tm_isdst=0)

>>> time.gmtime()
time.struct_time(tm_year=2020, tm_mon=5, tm_mday=27, tm_hour=13, tm_min=58, tm_sec=23, tm_wday=2, tm_yday=148, tm_isdst=0)

>>> time.time()
1590587909.801845

>>> time.mktime(time.localtime())
1590587921.0

>>> time.mktime(time.localtime())
1590587926.0

>>>
```

### `time.sleep(seconds)`让程序暂停执行

```py
>>> time.sleep?
Docstring:
sleep(seconds)

Delay execution for a given number of seconds.  The argument may be
a floating point number for subsecond precision.
Type:      builtin_function_or_method

>>> time.sleep(2)

>>> for i in range(3):
...     print(time.localtime())
...     time.sleep(2)
...     print(time.localtime())
...
time.struct_time(tm_year=2020, tm_mon=5, tm_mday=27, tm_hour=22, tm_min=2, tm_sec=51, tm_wday=2, tm_yday=148, tm_isdst=0)
time.struct_time(tm_year=2020, tm_mon=5, tm_mday=27, tm_hour=22, tm_min=2, tm_sec=53, tm_wday=2, tm_yday=148, tm_isdst=0)
time.struct_time(tm_year=2020, tm_mon=5, tm_mday=27, tm_hour=22, tm_min=2, tm_sec=53, tm_wday=2, tm_yday=148, tm_isdst=0)
time.struct_time(tm_year=2020, tm_mon=5, tm_mday=27, tm_hour=22, tm_min=2, tm_sec=55, tm_wday=2, tm_yday=148, tm_isdst=0)
time.struct_time(tm_year=2020, tm_mon=5, tm_mday=27, tm_hour=22, tm_min=2, tm_sec=55, tm_wday=2, tm_yday=148, tm_isdst=0)
time.struct_time(tm_year=2020, tm_mon=5, tm_mday=27, tm_hour=22, tm_min=2, tm_sec=57, tm_wday=2, tm_yday=148, tm_isdst=0)

>>>
```
可以看出在`for`语句中，每次循环时中间都会暂停2秒再执行下一次循环。

### `time.strftime`将时间元组转换成指定格式的字符串

常用的格式化符号可见下面的帮助信息（注：后面的中文是我加上去的）：

```py
>>> time.strftime?
Docstring:
strftime(format[, tuple]) -> string

Convert a time tuple to a string according to a format specification.
See the library reference manual for formatting codes. When the time tuple
is not present, current time as returned by localtime() is used.

Commonly used format codes:

%Y  Year with century as a decimal number.  4位年份，如2020
%m  Month as a decimal number [01,12]. 月份，如05
%d  Day of the month as a decimal number [01,31]. 日期，如06
%H  Hour (24-hour clock) as a decimal number [00,23]. 24小时制小时数，如07
%M  Minute as a decimal number [00,59]. 分钟数，如08
%S  Second as a decimal number [00,61]. 秒数，如09
%z  Time zone offset from UTC. 时区偏差
%a  Locale's abbreviated weekday name. 本地简化星期名称
%A  Locale's full weekday name. 本地完整星期名称
%b  Locale's abbreviated month name. 简化月份名称
%B  Locale's full month name. 完整月份名称
%c  Locale's appropriate date and time representation. 本地相应的日期表示和时间表示
%I  Hour (12-hour clock) as a decimal number [01,12]. 12小时制小时数
%p  Locale's equivalent of either AM or PM. 上午或下午表示符

Other codes may be available on your platform.  See documentation for
the C library strftime function.
Type:      builtin_function_or_method

# 按4位年2位月2位日 2位时2位分2位秒输出当前时间
>>> time.strftime('%Y%m%d %H%M%S', time.localtime())
'20200527 221453'

>>> time.strftime('%Y%m%d %H%M%S', time.localtime())
'20200527 221455'

>>> time.strftime('%Y%m%d %H%M%S', time.localtime())
'20200527 221458'

>>> time.strftime('%Y%m%d %H%M%S', time.localtime())
'20200527 221500'

>>> time.strftime('%Y%m%d %H%M%S', time.localtime())
'20200527 221501'

>>> time.strftime('%Y%m%d %H%M%S', time.localtime())
'20200527 221503'

# 时间格式中加入其他元素
>>> time.strftime('%Y年%m月%d日 %H:%M:%S', time.localtime())
'2020年05月27日 22:19:10'

>>> time.strftime('%Y年%m月%d日 %H:%M:%S')
'2020年05月27日 22:21:50'

# 输出时间偏差和星期简写
>>> time.strftime('%Y年%m月%d日 %H:%M:%S %z %a')
'2020年05月27日 22:29:24 +0800 Wed'

# 输出时间偏差和星期全称
>>> time.strftime('%Y年%m月%d日 %H:%M:%S %z %A')
'2020年05月27日 22:29:33 +0800 Wednesday'


>>> time.strftime('%Y %B %d', time.gmtime(1))
'1970 January 01'

>>> time.strftime('%Y %b %d', time.gmtime(1))
'1970 Jan 01'

>>> time.strftime('%c', time.gmtime(1))
'Thu Jan  1 00:00:01 1970'

>>> time.strftime('%c')
'Wed May 27 22:35:20 2020'

>>> time.strftime('%c', time.gmtime(123456789))
'Thu Nov 29 21:33:09 1973'

# 数据太大，无法存储
>>> time.strftime('%c', time.gmtime(1234567891011121314))
---------------------------------------------------------------------------
OSError                                   Traceback (most recent call last)
<ipython-input-83-13fec9b44855> in <module>
----> 1 time.strftime('%c', time.gmtime(1234567891011121314))

OSError: [Errno 84] Value too large to be stored in data type

>>> time.strftime('%c', time.gmtime(12345678910111213))
'Tue Sep  2 08:40:13 391220960'

>>> time.strftime('%c', time.gmtime(123456789101112))
'Wed Nov 28 00:05:12 3914159'

>>> time.strftime('%c', time.gmtime(1234567891011))
'Wed Nov 25 05:16:51 41091'

>>> time.strftime('%c', time.gmtime(12345678910))
'Tue Mar 21 19:15:10 2361'

>>> time.strftime('%c', time.gmtime(123456789))
'Thu Nov 29 21:33:09 1973'

>>> time.strftime('%c', time.localtime())
'Wed May 27 22:39:01 2020'

>>>
```


### `time.strptime`将时间字符串按指定格式解析成时间元组

 `time.strptime(string, format)`将时间字符串按指定格式解析成时间元组,注意时间字符串在前，时间格式化参数在后。
 
```py
>>> time.strptime?
Docstring:
strptime(string, format) -> struct_time

Parse a string to a time tuple according to a format specification.
See the library reference manual for formatting codes (same as
strftime()).

Commonly used format codes:

%Y  Year with century as a decimal number.
%m  Month as a decimal number [01,12].
%d  Day of the month as a decimal number [01,31].
%H  Hour (24-hour clock) as a decimal number [00,23].
%M  Minute as a decimal number [00,59].
%S  Second as a decimal number [00,61].
%z  Time zone offset from UTC.
%a  Locale's abbreviated weekday name.
%A  Locale's full weekday name.
%b  Locale's abbreviated month name.
%B  Locale's full month name.
%c  Locale's appropriate date and time representation.
%I  Hour (12-hour clock) as a decimal number [01,12].
%p  Locale's equivalent of either AM or PM.

Other codes may be available on your platform.  See documentation for
the C library strftime function.
Type:      builtin_function_or_method

>>> time.strptime('20200527 224734', '%Y%m%d %H%M%S')
time.struct_time(tm_year=2020, tm_mon=5, tm_mday=27, tm_hour=22, tm_min=47, tm_sec=34, tm_wday=2, tm_yday=148, tm_isdst=-1)

# 给的时间字符串与格式化字符串需要对应，不对应匹配则会抛出异常
>>> time.strptime('20200527 224734', '%Y年%m月%d日 %H:%M:%S')
--出现异常...
ValueError: time data '20200527 224734' does not match format '%Y年%m月%d日 %H:%M:%S'

>>> time.strptime('2020年05月27日 22:47:34', '%Y年%m月%d日 %H:%M:%S')
time.struct_time(tm_year=2020, tm_mon=5, tm_mday=27, tm_hour=22, tm_min=47, tm_sec=34, tm_wday=2, tm_yday=148, tm_isdst=-1)

>>>
```



### `time.perf_counter()`计算程序运行时间

官方文档介绍如下：

> Return the value (in fractional seconds) of a performance counter, i.e. a clock with the highest available resolution to measure a short duration. It does include time elapsed during sleep and is system-wide. The reference point of the returned value is undefined, so that only the difference between the results of consecutive calls is valid.
    
 即：`time.perf_counter()`返回性能计数器的值（以分数秒为单位），即具有最高可用分辨率的时钟，以测量较短的持续时间。 它包含整个系统的睡眠时间。 返回值的参考点是不确定的，因此仅连续调用的结果之间的差有效。  
    
```py
>>> time.perf_counter?
Docstring:
perf_counter() -> float

Performance counter for benchmarking.
Type:      builtin_function_or_method
>>> def timeit(n):
...     start = time.perf_counter()
...     sum = 0
...     for i in range(n):
...         sum += i
...     time.sleep(n)
...     end = time.perf_counter()
...     print(start, end, end - start)
...

>>> timeit(3)
16912.547074853 16915.552290544 3.005215691002377

>>> timeit(10)
16927.02270078 16937.027870937 10.005170157000975
```
可以看到，当`n`值不同时，程序执行的时间不同，当`n`为3时，执行时间为`3.005215691002377`,当`n`为10时，执行时间为`10.005170157000975`,而这其中包含`time.sleep(n)`程序暂停的时间。

 time.process_time()计算程序(不含睡眠时间)的运行时间

官方文档介绍如下：

> Return the value (in fractional seconds) of the sum of the system and user CPU time of the current process. It does not include time elapsed during sleep. It is process-wide by definition. The reference point of the returned value is undefined, so that only the difference between the results of consecutive calls is valid.

即：返回当前进程的系统和用户CPU时间之和的值（以秒为单位）。 它不包括睡眠期间经过的时间。 根据定义，它是整个过程的。 返回值的参考点是不确定的，因此仅连续调用的结果之间的差有效。

```py
>>> time.process_time?
Docstring:
process_time() -> float

Process time for profiling: sum of the kernel and user-space CPU time.
Type:      builtin_function_or_method

>>> def timeit(n):
...     start = time.process_time()
...     sum = 0
...     for i in range(n):
...         sum += i
...     time.sleep(n)
...     end = time.process_time()
...     print(start, end, end - start)
...

>>> timeit(3)
21.771753 21.772565 0.0008119999999998129

>>> timeit(10)
21.81368 21.81468 0.0009999999999976694
```
可以发现此时并没有考虑程序暂停时所花费的时间。

计算程序的运行时间可以用`timeit`模块，后续补充。

### `time.get_clock_info(name)`获取指定时间类型的时钟信息

获取有关指定时钟的信息作为名称空间对象。 支持的时钟名称和读取其值的相应功能是：

- 'clock': `time.clock()`
- 'monotonic': `time.monotonic()`
- 'perf_counter': `time.perf_counter()`
- 'process_time': `time.process_time()`
- 'time': `time.time()`

```py
>>> time.get_clock_info?
Docstring:
get_clock_info(name: str) -> dict

Get information of the specified clock.
Type:      builtin_function_or_method

>>> time.get_clock_info('clock')
namespace(adjustable=False, implementation='clock()', monotonic=True, resolution=1e-06)

>>> time.get_clock_info('time')
namespace(adjustable=True, implementation='gettimeofday()', monotonic=False, resolution=1e-06)

>>> time.get_clock_info('monotonic')
namespace(adjustable=False, implementation='mach_absolute_time()', monotonic=True, resolution=1e-09)

>>> time.get_clock_info('perf_counter')
namespace(adjustable=False, implementation='mach_absolute_time()', monotonic=True, resolution=1e-09)

>>> time.get_clock_info('process_time')
namespace(adjustable=False, implementation='getrusage(RUSAGE_SELF)', monotonic=True, resolution=1e-06)
```

### `time.monotonic()`返回一个只增加的时钟

```py
>>> time.monotonic?
Docstring:
monotonic() -> float

Monotonic clock, cannot go backward.
Type:      builtin_function_or_method

>>> time.monotonic()
19785.01834342

>>> time.monotonic()
19786.86552583

>>> time.monotonic()
19787.973120366
```

参考：
[Python time.tzsets 代码实例 https://www.kutu66.com//Python-Module-Examples/article_59589](https://www.kutu66.com//Python-Module-Examples/article_59589)



time.altzone
time.daylight
time.timezone
time.tzname

## `datetime`模块


## `dateutil`模块


## `arrow`模块

## `fleming`模块

## `pytz`时区模块



