import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(),
        body: Container(),
        bottomNavigationBar: BottomAppBar(),
      )

      // home: Text("안녕") // 글자 위젯
      // home: Image.asset('assets/kiwi.jpg') // 이미지 위젯
      // home: Icon(Icons.star) // 아이콘 위젯
      // home: Center(
      //   child: Container( width: 50, height: 50, color: Colors.blue ),
      // )
      // home: MaterialApp() // 구글 스타일 및 커스텀
      // home: Scaffold() // 아이폰 스타일
      // home: Container( width: 50, height: 50, color: Colors.blue ) // 박스 위젯
    );
  }
}
