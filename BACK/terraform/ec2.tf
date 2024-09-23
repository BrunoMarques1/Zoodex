resource "aws_instance" "Zoodex" {
  ami             = "ami-0ebfd941bbafe70c6"
  instance_type   = "t2.micro"
  subnet_id       = aws_subnet.public_subnet.id
  security_groups = [aws_security_group.ec2_sg.id]
  key_name = "ZoodexKeyPair"

  tags = {
    Name = "Zoodex"
  }
}

