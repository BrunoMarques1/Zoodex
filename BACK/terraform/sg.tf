resource "aws_security_group" "ec2_sg" { 
  name = "ec2_sg"
  vpc_id = aws_vpc.vpc.id

  ingress {
    protocol  = "TCP"
    from_port = 22
    to_port   = 22
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    protocol  = "TCP"
    from_port = 80
    to_port   = 80
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    protocol  = "TCP"
    from_port = 443
    to_port   = 443
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    protocol  = "TCP"
    from_port = 8000
    to_port   = 8000
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}