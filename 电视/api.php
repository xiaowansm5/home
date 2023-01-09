<?


$handler = opendir('./assets/mp4/');//当前目录中的文件夹下的文件夹     需要获取的目录文件夹名字
while( ($filename = readdir($handler)) !== false ) {
      if($filename != "." && $filename != ".."){
          //echo $filename."<br>";
          $tmp[] =  $filename;
      }
}
closedir($handler);
//print_r($tmp);

$arr=array_rand($tmp);
$video='./assets/mp4/'.$tmp[$arr];
header("location:$video");





?>