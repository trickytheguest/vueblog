.. _02_sum_count_avg:

mysql数据库求字段的总和、总数与均值
======================================

概述  
--------------------
- MySQL的SUM函数是用来求出各种记录中的字段的总和。

- MySQL的COUNT函数是用来求出各种记录中的字段的总数。

- MySQL的AVG函数是用来求出各种记录中的字段的平均值。

求和SUM::

    SELECT SUM(column_name) FROM table_name WHERE condition

统计所有记录的数量COUNT::

    SELECT COUNT(*) FROM table_name

统计某列的数量COUNT::
    
    SELECT COUNT(column_name) FROM table_name WHERE condition

统计某列不重复的数量，使用DISTINCT::

    SELECT COUNT(DISTINCT column_name) FROM table_name

求均值SVG::

    SELECT SVG(column_name) FROM table_name WHERE condition
